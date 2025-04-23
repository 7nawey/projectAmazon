import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service'; // تأكد إن المسار مناسب حسب مشروعك
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  shipping: any = null;
  orderId: number = 0;
  isPaymentConfirmed: boolean = false;
  isOrderSuccess: boolean = false;
  orders: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // ✅ استخدم التوكن بدلاً من application_user_id
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.route.paramMap.subscribe(params => {
      const id = params.get('orderId');
      if (id) {
        this.orderId = +id;
        this.loadShipping();
        this.checkPaymentStatus();
        this.checkOrderState();
      } else {
        this.router.navigate(['/orders']);
      }
    });
  }

  checkOrderState(): void {
    this.http.get<any>(`https://localhost:7105/api/order/${this.orderId}`)
      .subscribe(
        data => {
          console.log('Order Data:', data);
          if (data && data.orderStatus?.toLowerCase() === 'success') {
            this.isOrderSuccess = true;
          }
        },
        error => {
          console.error("Error fetching order state:", error);
        }
      );
  }

  loadShipping(): void {
    this.http.get<any>(`https://localhost:7105/api/shipping/order/${this.orderId}`)
      .subscribe(
        data => {
          this.shipping = data;
        },
        error => {
          console.error("Error fetching shipping data:", error);
        }
      );
  }

  checkPaymentStatus(): void {
    this.http.get<any>(`https://localhost:7105/api/payments/order/${this.orderId}`)
      .subscribe(
        data => {
          if (data?.paymentStatus === 'Completed') {
            this.isPaymentConfirmed = true;
          }
        },
        error => {
          console.warn("Error checking payment status:", error);
        }
      );
  }

  goBack(): void {
    this.router.navigate(['/orders']);
  }

  editShipping(): void {
    if (this.shipping?.shippingID) {
      localStorage.setItem('shippingId', this.shipping.shippingID.toString());
    }
    this.router.navigate(['/checkout'], { queryParams: { edit: 'true' } });
  }

  goToCheckout(orderId: number): void {
    this.router.navigate(['/checkout'], { queryParams: { orderId } });
  }
}
