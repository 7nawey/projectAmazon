import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service'; // تأكد إن المسار مناسب حسب مشروعك
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,TranslateModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  step = 1;
  addressForm: FormGroup;
  paymentMethod: string = '';
  orderId = 1;
  paymentId: number | null = null;
  totalAmount: number = 0;
  unsupportedMethodSelected: boolean = false;
  shippingId: number | null = null;
  userId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      building: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      governorate: ['', Validators.required]
    });
  }

  toggleStep(targetStep: number) {
    this.step = targetStep;
  }

  ngOnInit() {
    this.userId = this.authService.getApplicationUserId();

    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.route.queryParams.subscribe(params => {
      const passedOrderId = params['orderId'];

      if (passedOrderId) {
        this.orderId = +passedOrderId;
        this.loadOrderDetails();
      } else {
        this.http.get<any>(`https://localhost:7105/api/order/current/${this.userId}`)
          .subscribe(res => {
            if (!res || !res.orderID) {
              this.router.navigate(['/cart']);
              return;
            }
            this.orderId = res.orderID;
            this.loadOrderDetails();
          }, err => {
            console.error('Failed to get current order', err);
            this.router.navigate(['/cart']);
          });
      }
    });
  }

  loadOrderDetails() {
    this.getOrderTotal();
    this.getExistingPayment();
    this.getShippingAddress();
  }

  getOrderTotal() {
    this.http.get<any>(`https://localhost:7105/api/order/${this.orderId}`)
      .subscribe(res => {
        this.totalAmount = res.totalAmount;
      }, err => {
        console.error('Failed to load order total', err);
      });
  }

  getExistingPayment() {
    this.http.get<any>(`https://localhost:7105/api/payments/order/${this.orderId}`)
      .subscribe(res => {
        if (res && res.paymentId) {
          this.paymentId = res.paymentId;
          this.paymentMethod = res.paymentMethod;
        }
      }, err => {
        console.warn('No existing payment found', err);
      });
  }

  createOrUpdatePayment() {
    const payload: any = {
      paymentId: this.paymentId,
      orderId: this.orderId,
      paymentMethod: this.paymentMethod,
      paymentStatus: 'Pending',
      paymentDate: new Date().toISOString()
    };

    if (this.paymentId) {
      this.http.put<any>(`https://localhost:7105/api/payments/${this.paymentId}`, payload)
        .subscribe(() => {
          console.log('Payment updated');
        }, err => {
          console.error('Failed to update payment', err);
        });
    } else {
      this.http.post<any>('https://localhost:7105/api/payments/create', payload)
        .subscribe(res => {
          this.paymentId = res.paymentId;
        });
    }
  }

  deliverToThisAddress() {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    const formValue = this.addressForm.value;
    const address = `${formValue.street}, ${formValue.building}, ${formValue.city}, ${formValue.district}, ${formValue.governorate}`;

    const payload = {
      shippingAddress: address,
      shippingStatus: 'Pending',
      orderId: this.orderId
    };

    this.http.post<any>('https://localhost:7105/api/shipping', payload)
      .subscribe(res => {
        this.shippingId = res.shippingId;
        this.step = 2;
      }, err => {
        console.error('Failed to save or update shipping address', err);
      });
  }

  useThisPaymentMethod() {
    if (this.paymentMethod !== 'PayPal' && this.paymentMethod !== 'CashOnDelivery') {
      this.unsupportedMethodSelected = true;
      return;
    }

    this.unsupportedMethodSelected = false;
    this.createOrUpdatePayment();
    this.step = 3;
  }

  verifyAndPlaceOrder() {
    if (!this.paymentId) return;

    if (this.paymentMethod === 'CashOnDelivery') {
      localStorage.setItem('orderSuccess', 'true');
      this.router.navigate(['/thankyou']);
    } else if (this.paymentMethod === 'PayPal') {
      this.http.post<any>(`https://localhost:7105/api/payments/process/${this.paymentId}`, {})
        .subscribe(res => {
          window.location.href = res.redirectUrl;
        }, err => {
          console.error('Error redirecting to PayPal', err);
        });
    }

    const status = "Success";
    const requestBody = JSON.stringify(status);

    this.http.put<any>(`https://localhost:7105/api/order/${this.orderId}/status`, requestBody, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      error: (err) => {
        console.error("Error while updating order status:", err);
        alert("حصل خطأ أثناء تأكيد الطلب.");
      }
    });
  }

  getShippingAddress() {
    this.http.get<any>(`https://localhost:7105/api/shipping/order/${this.orderId}`)
      .subscribe(res => {
        if (res && res.shippingAddress) {
          this.shippingId = res.shippingId;

          const parts = res.shippingAddress.split(',').map((p: string) => p.trim());
          this.addressForm.patchValue({
            street: parts[0] || '',
            building: parts[1] || '',
            city: parts[2] || '',
            district: parts[3] || '',
            governorate: parts[4] || ''
          });
        }
      }, err => {
        console.warn('No existing shipping address found', err);
      });
  }
}
