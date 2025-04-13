import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
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

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
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

    const userId = localStorage.getItem('application_user_id'); // خزنته أثناء تسجيل الدخول
    // userId="14b1a20f-b5c7-4dbd-8b3f-311e2200b609";
    if (!userId) {
      // alert("You must log in first.");
      this.router.navigate(['/login']);
      return;
    }
    this.http.get<any>(`https://localhost:7105/api/order/current/${userId}`)
    .subscribe(res => {
      if (!res || !res.orderID) {
        // alert("No current order. Please add products to the cart first.");
        this.router.navigate(['/cart']);
        return;
      }

      this.orderId = res.orderID;
      this.getOrderTotal();
      this.getExistingPayment();
      this.getShippingAddress();
    }, err => {
      console.error('Failed to get current order', err);
      this.router.navigate(['/cart']);
    });
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   alert("You must log in first.");
    //   this.router.navigate(['/login']);
    //   return;
    // }
  
    // const orderIdFromStorage = localStorage.getItem('orderId');
    // if (!orderIdFromStorage || +orderIdFromStorage === 0) {
    //   alert("No current order. Please add products to the cart first.");
    //   this.router.navigate(['/cart']);
    //   return;
    // }
  
    // this.orderId = +orderIdFromStorage;
    // this.getOrderTotal();
    // this.getExistingPayment();
    // this.getShippingAddress();
    

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
    if (this.paymentMethod !== 'PayPal') {
      this.unsupportedMethodSelected = true;
      return;
    }

    this.unsupportedMethodSelected = false;
    this.createOrUpdatePayment();
    this.step = 3;
  }

  verifyAndPlaceOrder() {
    if (!this.paymentId) return;

    this.http.post<any>(`https://localhost:7105/api/payments/process/${this.paymentId}`, {})
      .subscribe(res => {
        window.location.href = res.redirectUrl;
      }, err => {
        console.error('Error redirecting to PayPal', err);
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