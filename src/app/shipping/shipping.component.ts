import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  shipping: any = null;
  orderId: number = 0;
  isPaymentConfirmed: boolean = false;
  isOrderSuccess: boolean = false;
  orders: any[] = [];


  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('application_user_id');

    if (!userId) {
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
        // لو مفيش orderId في الرابط نرجعه للصفحة الرئيسية أو السلة
        this.router.navigate(['/orders']);
      }
    });
  }
  checkOrderState(): void {
  this.http.get<any>(`https://localhost:7105/api/order/${this.orderId}`)
    .subscribe(
      data => {
        console.log('Order Data:', data); // ✅ اطبع البيانات وشوف شكلها
        if (data && data.orderStatus && data.orderStatus.toLowerCase() === 'success') {
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
          if (data && data.paymentStatus === 'Completed') {
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
    if (this.shipping && this.shipping.shippingID) {
      localStorage.setItem('shippingId', this.shipping.shippingID.toString());
    }
    this.router.navigate(['/checkout'], { queryParams: { edit: 'true' } });
  }

  goToCheckout(orderId: number): void {
    this.router.navigate(['/checkout'], { queryParams: { orderId } });
  } 
}
