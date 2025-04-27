import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

export interface CartItem {
  productID: number;
  quantity: number;
  price: number;
  oldPrice?: number;
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
  private baseUrl = 'https://kashef.runasp.net/api/Cart';
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  cart$ = this.cartSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  private getUserId(): string | null {
    return this.authService.getApplicationUserId();
  }

  private checkUserLogin(): boolean {
    const userId = this.getUserId();
    if (!userId) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  getCart(): Observable<Cart> {
    if (!this.checkUserLogin()) return new Observable<Cart>();
    const userId = this.getUserId();
    return this.http.get<Cart>(`${this.baseUrl}/${userId}`, { headers: this.getHeaders() });
  }

  updateCart(): void {
    const userId = this.getUserId();
    if (!userId) return;
    this.http.get<Cart>(`${this.baseUrl}/${userId}`, { headers: this.getHeaders() }).subscribe(cart => {
      this.cartSubject.next(cart);
    });
  }

  addToCart(productId: number): Observable<any> {
    if (!this.checkUserLogin()) return new Observable<any>();
    const userId = this.getUserId();
    return this.http.post(`${this.baseUrl}/add?applicationUserId=${userId}&productId=${productId}`, {}, { headers: this.getHeaders() }).pipe(
      tap(() => this.updateCart())
    );
  }

  removeFromCart(productId: number): Observable<any> {
    if (!this.checkUserLogin()) return new Observable<any>();
    const userId = this.getUserId();
    return this.http.post(`${this.baseUrl}/remove?applicationUserId=${userId}&productId=${productId}`, {}, { headers: this.getHeaders() }).pipe(
      tap(() => this.updateCart())
    );
  }

  increaseQuantity(productId: number): Observable<any> {
    if (!this.checkUserLogin()) return new Observable<any>();
    const userId = this.getUserId();
    return this.http.post(`${this.baseUrl}/increase?applicationUserId=${userId}&productId=${productId}`, {}, { headers: this.getHeaders() }).pipe(
      tap(() => this.updateCart())
    );
  }

  decreaseQuantity(productId: number): Observable<any> {
    if (!this.checkUserLogin()) return new Observable<any>();
    const userId = this.getUserId();
    return this.http.post(`${this.baseUrl}/decrease?applicationUserId=${userId}&productId=${productId}`, {}, { headers: this.getHeaders() }).pipe(
      tap(() => this.updateCart())
    );
  }

  placeOrder(): Observable<any> {
    const userId = this.getUserId();
    return this.http.post(`https://kashef.runasp.net/api/Order/place-order/${userId}`, {}, { headers: this.getHeaders() })
      .pipe(
        tap(() => this.updateCart())  // ✅ تحديث الكارت بعد الطلب
      );
  }
  
}
