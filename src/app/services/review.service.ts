import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'https://kashef.runasp.net/api/Review';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ✅ هنا بنبعت الـ userId كـ query
  addReview(userId: string, productId: number, review: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add?productId=${productId}&applicationUserId=${userId}`, review, {
      headers: this.getHeaders()
    });
  }

  getReviewsByProduct(productId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${productId}`);
  }
}
