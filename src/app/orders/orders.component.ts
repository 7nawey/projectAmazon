import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class OrdersComponent implements OnInit {

  successMessage: string | null = null;
  orders: any[] = [];
  confirmCancelOrderId: number | null = null;
  customerId = localStorage.getItem('application_user_id') || '';

  constructor(private router: Router,private http: HttpClient) {}

  ngOnInit(): void {
    if (!this.customerId) {
      this.successMessage = 'You must be logged in.';
      return;
    }

    this.fetchOrders();
  }

  fetchOrders() {
    this.http.get<any[]>(`https://localhost:7105/api/Order/customer/${this.customerId}`)
      .subscribe({
        next: (orders) => {
          // ابدأ بجلب عناصر كل طلب
          const requests = orders.map(order =>
            this.http.get<any[]>(`https://localhost:7105/api/OrderItems/ByOrder/${order.orderID}`)
              .toPromise()
              .then(items => {
                order.items = items; // أضف العناصر للطلب
                return order;
              })
          );
  
          Promise.all(requests).then(results => {
            this.orders = results.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
          });
        },
        error: (err) => console.error('Error fetching orders', err)
      });
  }
  

  onRequestCancel(orderId: number) {
    this.confirmCancelOrderId = orderId;
  }

  confirmCancel(orderId: number) {
    this.http.delete(`https://localhost:7105/api/Order/${orderId}`).subscribe({
      next: () => {
        this.orders = this.orders.filter(o => o.orderID !== orderId);
        this.successMessage = 'Order canceled successfully.';
        this.confirmCancelOrderId = null;

        setTimeout(() => this.successMessage = null, 3000);
      },
      error: (err) => {
        console.error('Cancel failed', err);
        this.successMessage = 'Failed to cancel order.';
        this.confirmCancelOrderId = null;

        setTimeout(() => this.successMessage = null, 3000);
      }
    });
  }

  cancelConfirmation() {
    this.confirmCancelOrderId = null;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'border-warning';
      case 'completed': return 'border-success';
      case 'canceled': return 'border-danger';
      default: return '';
    }
  }
  goToShipping(orderId: number) {
    this.router.navigate(['/shipping', orderId]);
  }
  goToCheckout(orderId: number): void {
    this.router.navigate(['/checkout'], { queryParams: { orderId } });
  }  
}
