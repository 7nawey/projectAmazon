import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shipping-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css'],

})
export class ShippingDetailsComponent implements OnInit {
  shippingId: number = 0;
  shippingDetails: any;
  loading: boolean = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.shippingId = Number(this.route.snapshot.paramMap.get('shippingId'));

    const token = localStorage.getItem('token');

    if (!token) {
      this.error = 'Token not found. Please login.';
      this.loading = false;
      return;
    }

    // 👇 Decode token to extract ApplicationUserId
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload['ApplicationUserId']; // 👈 تأكد من اسم الـ Claim

    if (!userId) {
      this.error = 'User ID not found in token.';
      this.loading = false;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // 👇 Append userId as query parameter
    const url = `https://localhost:7105/api/Shipping/details/${this.shippingId}?currentuserid=${userId}`;

    this.http.get(url, { headers }).subscribe({
      next: (data) => {
        this.shippingDetails = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching shipping details', err);
        this.error = err.status === 401 ? 'Unauthorized. Please login.' : 'Something went wrong.';
        this.loading = false;
      }
    });
  }
}
