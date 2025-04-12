import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('application_user_id');
   
    
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.http.get<any>(`https://localhost:7105/api/order/current/${userId}`)
      .subscribe(
        res => {
          if (!res || !res.orderID) {
            this.router.navigate(['/cart']);
            return;
          }

          this.orderId = res.orderID;
          this.loadShipping();
          this.checkPaymentStatus(); 
        },
        err => {
          console.error("Error fetching current order:", err);
          this.router.navigate(['/cart']);
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
    this.router.navigate(['/']);
  }

  editShipping(): void {
    this.router.navigate(['/checkout'], { queryParams: { edit: 'true' } });
  }
}
