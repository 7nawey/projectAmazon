import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shippingall',
  imports: [CommonModule],
  templateUrl: './shippingall.component.html',
  styleUrl: './shippingall.component.css'
})
export class ShippingallComponent {
  customerId: string | null = null;
  shippedOrders: any[] = [];
  successMessage: string | null = null;
  

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.customerId = this.authService.getApplicationUserId();
      this.fetchShippedOrders();
    } else {
      this.successMessage = 'You must be logged in to view shipping info.';
    }
  }

  fetchShippedOrders() {
    this.http.get<any[]>(`https://localhost:7105/api/Order/customer/${this.customerId}`).subscribe({
      next: (orders) => {
        const shipped = orders.filter(o => o.orderStatus.toLowerCase() === 'completed' || o.orderStatus.toLowerCase() === 'success');
  
        const requests = shipped.map(order =>
          Promise.all([ 
            this.http.get<any[]>(`https://localhost:7105/api/OrderItems/ByOrder/${order.orderID}`).toPromise(),
            this.http.get<any>(`https://localhost:7105/api/shipping/order/${order.orderID}`).toPromise()
          ]).then(([items, shipping]) => {
            order.items = items;
            shipping.shippingId = shipping.shippingID;

            if (shipping?.shippingAddress) {
              const parts = shipping.shippingAddress.split(',').map((p: string) => p.trim());
              shipping.street = parts[0] || '';
              shipping.building = parts[1] || '';
              shipping.city = parts[2] || '';
              shipping.district = parts[3] || '';
              shipping.governorate = parts[4] || '';
            }
  
            order.shipping = shipping;
            return order;
          })
        );
  
        Promise.all(requests).then(results => {
          this.shippedOrders = results.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
        });
      },
      error: (err) => {
        console.error('Error fetching shipping orders', err);
      }
    });
  }

  // Method to determine the badge class based on the shipping status
  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-success';
      case 'pending':
        return 'bg-warning';
      case 'shipped':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  }

  goToDetails(shippingId: number) {
    console.log('Shipping ID:', shippingId);
    this.router.navigate(['/shipping-details', shippingId]);
  }
  
  
}
