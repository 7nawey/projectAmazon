import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';  // إضافة هذه السطر



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
  
  private cartSubject = new BehaviorSubject<Cart | null>(this.loadCartFromLocalStorage());  // تحميل السلة من LocalStorage
  cart$ = this.cartSubject.asObservable();


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


  private checkUserLogin(): boolean {

    const userId = this.getApplicationUserId();
    if (!userId) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }


  private saveCartToLocalStorage(cart: Cart): void {
    localStorage.setItem('cart', JSON.stringify(cart));  // حفظ السلة في LocalStorage
  }

  private loadCartFromLocalStorage(): Cart | null {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : null;  // استرجاع السلة من LocalStorage
  }


  getCart(): Observable<Cart> {
    if (!this.checkUserLogin()) {
      return new Observable<Cart>(); 
    }

    const userId = this.getApplicationUserId();
    return this.http.get<Cart>(`${this.baseUrl}/${userId}`, { headers: this.getHeaders() });
  }


  updateCart(): void {
    const userId = this.getApplicationUserId();
    this.http.get<Cart>(`${this.baseUrl}/${userId}`, { headers: this.getHeaders() }).subscribe(cart => {
      this.cartSubject.next(cart);  // تحديث الـ BehaviorSubject عند الحصول على السلة
      this.saveCartToLocalStorage(cart);  // حفظ السلة في LocalStorage
    });
  }

  addToCart(productId: number): Observable<any> {
    if (!this.checkUserLogin()) {
      return new Observable<any>();

    }

    const userId = this.getApplicationUserId();
    return this.http.post(`${this.baseUrl}/add?applicationUserId=${userId}&productId=${productId}`, {}, { headers: this.getHeaders() }).pipe(
      tap(() => this.updateCart())
    );
  }

  removeFromCart(productId: number): Observable<any> {
    if (!this.checkUserLogin()) {

      return new Observable<any>();

    }

    const userId = this.getApplicationUserId();
    return this.http.post(`${this.baseUrl}/remove?applicationUserId=${userId}&productId=${productId}`, {}, { headers: this.getHeaders() }).pipe(
      tap(() => this.updateCart())
    );
  }

  increaseQuantity(productId: number): Observable<any> {
    if (!this.checkUserLogin()) {

      return new Observable<any>();

    }

    const userId = this.getApplicationUserId();
    return this.http.post(`${this.baseUrl}/increase?applicationUserId=${userId}&productId=${productId}`, {}, { headers: this.getHeaders() }).pipe(
      tap(() => this.updateCart())
    );
  }

  decreaseQuantity(productId: number): Observable<any> {
    if (!this.checkUserLogin()) {

      return new Observable<any>();

    }

    const userId = this.getApplicationUserId();
    return this.http.post(`${this.baseUrl}/decrease?applicationUserId=${userId}&productId=${productId}`, {}, { headers: this.getHeaders() }).pipe(
      tap(() => this.updateCart())
    );
  }
  placeOrder(customerId: string) {
    return this.http.post(`https://localhost:7105/api/Order/place-order/${customerId}`, {});
  }
}

