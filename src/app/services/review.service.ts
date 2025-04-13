import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'https://localhost:7105/api/Review';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // تعديل دالة إضافة المراجعة لتشمل applicationUserId و productId في الـ query
  addReview(applicationUserId: string, productId: number, review: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add?applicationUserId=${applicationUserId}&productId=${productId}`, review, {
      headers: this.getHeaders()
    });
  }

  // تعديل دالة تحميل المراجعات لتتناسب مع الـ endpoint الصحيح
  getReviewsByProduct(productId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${productId}`);  // استخدام المسار الصحيح هنا
  }
}
