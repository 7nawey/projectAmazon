import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; 

export interface CartItem {
  productID: number;
  quantity: number;
  price: number;
  imgCover: string;
}

export interface Cart {
  cartID: number;
  applicationUserId: string;
  items: CartItem[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'https://localhost:7105/api/Cart';

  constructor(private http: HttpClient, private router: Router) {} 

  private getApplicationUserId(): string {
    return localStorage.getItem('application_user_id') || '';
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  private checkUserLogin() {
    const userId = this.getApplicationUserId();
    if (!userId) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  getCart(): Observable<Cart> {
    if (!this.checkUserLogin()) {
      return new Observable<Cart>(); 
    }

    const userId = this.getApplicationUserId();
    return this.http.get<Cart>(`${this.baseUrl}/${userId}`, { headers: this.getHeaders() });
  }

  addToCart(productId: number): Observable<any> {
    if (!this.checkUserLogin()) {
      return new Observable<any>(); 
    }

    const userId = this.getApplicationUserId();
    return this.http.post(`${this.baseUrl}/add?applicationUserId=${userId}&productId=${productId}`, {}, { headers: this.getHeaders() });
  }

  removeFromCart(productId: number): Observable<any> {
    if (!this.checkUserLogin()) {
      return new Observable<any>(); 
    }

    const userId = this.getApplicationUserId();
    return this.http.post(`${this.baseUrl}/remove?applicationUserId=${userId}&productId=${productId}`, {}, { headers: this.getHeaders() });
  }

  increaseQuantity(productId: number): Observable<any> {
    if (!this.checkUserLogin()) {
      return new Observable<any>(); 
    }

    const userId = this.getApplicationUserId();
    return this.http.post(`${this.baseUrl}/increase?applicationUserId=${userId}&productId=${productId}`, {}, { headers: this.getHeaders() });
  }

  decreaseQuantity(productId: number): Observable<any> {
    if (!this.checkUserLogin()) {
      return new Observable<any>(); 
    }

    const userId = this.getApplicationUserId();
    return this.http.post(`${this.baseUrl}/decrease?applicationUserId=${userId}&productId=${productId}`, {}, { headers: this.getHeaders() });
  }
}
