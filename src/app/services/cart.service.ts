import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; // إضافة الـ Router

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

  constructor(private http: HttpClient, private router: Router) {} // إضافة الـ Router

  // الحصول على الـ applicationUserId من localStorage
  private getApplicationUserId(): string {
    return localStorage.getItem('application_user_id') || ''; // احصل على applicationUserId من الـ localStorage
  }

  // إضافة التوكن إلى رأس الطلب
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // التحقق من وجود المستخدم وتوجيهه إلى صفحة تسجيل الدخول في حال عدم وجوده
  private checkUserLogin() {
    const userId = this.getApplicationUserId();
    if (!userId) {
      // إذا لم يكن المستخدم مسجل الدخول، توجيهه إلى صفحة تسجيل الدخول
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  // الحصول على الـ Cart
  getCart(): Observable<Cart> {
    if (!this.checkUserLogin()) {
      return new Observable<Cart>(); // العودة بـ Observable فارغ لأننا قمنا بتوجيهه إلى صفحة تسجيل الدخول
    }

    const userId = this.getApplicationUserId();
    return this.http.get<Cart>(`${this.baseUrl}/${userId}`, { headers: this.getHeaders() });
  }

  // إضافة منتج إلى السلة
  addToCart(productId: number): Observable<any> {
    if (!this.checkUserLogin()) {
      return new Observable<any>(); // العودة بـ Observable فارغ لأننا قمنا بتوجيهه إلى صفحة تسجيل الدخول
    }

    const userId = this.getApplicationUserId();
    return this.http.post(`${this.baseUrl}/add?applicationUserId=${userId}&productId=${productId}`, {}, { headers: this.getHeaders() });
  }

  // إزالة منتج من السلة
  removeFromCart(productId: number): Observable<any> {
    if (!this.checkUserLogin()) {
      return new Observable<any>(); // العودة بـ Observable فارغ لأننا قمنا بتوجيهه إلى صفحة تسجيل الدخول
    }

    const userId = this.getApplicationUserId();
    return this.http.post(`${this.baseUrl}/remove?applicationUserId=${userId}&productId=${productId}`, {}, { headers: this.getHeaders() });
  }

  // زيادة الكمية
  increaseQuantity(productId: number): Observable<any> {
    if (!this.checkUserLogin()) {
      return new Observable<any>(); // العودة بـ Observable فارغ لأننا قمنا بتوجيهه إلى صفحة تسجيل الدخول
    }

    const userId = this.getApplicationUserId();
    return this.http.post(`${this.baseUrl}/increase?applicationUserId=${userId}&productId=${productId}`, {}, { headers: this.getHeaders() });
  }

  // تقليل الكمية
  decreaseQuantity(productId: number): Observable<any> {
    if (!this.checkUserLogin()) {
      return new Observable<any>(); // العودة بـ Observable فارغ لأننا قمنا بتوجيهه إلى صفحة تسجيل الدخول
    }

    const userId = this.getApplicationUserId();
    return this.http.post(`${this.baseUrl}/decrease?applicationUserId=${userId}&productId=${productId}`, {}, { headers: this.getHeaders() });
  }
}
