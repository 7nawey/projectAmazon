import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

export interface WishlistItem {
  productID: number;
  productName: string;
  imgCover: string;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = 'https://localhost:7105/api/Wishlist';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getProductDetails(productID: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7105/api/products/${productID}`);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  private getApplicationUserId(): string | null {
    return this.authService.getApplicationUserId();
  }

  private checkUserLogin(): boolean {
    const token = localStorage.getItem('auth_token');
    if (!token || this.authService.isAuthenticated() === false) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  getWishlist(): Observable<WishlistItem[]> {
    const userId = this.getApplicationUserId();
    if (!userId) return of([]);

    return this.http.get<any>(`${this.baseUrl}/${userId}`, {
      headers: this.getHeaders()
    }).pipe(
      map((response: any) => response.items || []),
      catchError(() => of([]))
    );
  }

  addToWishlist(productId: number): Observable<any> {
    if (!this.checkUserLogin()) return new Observable<any>();

    const userId = this.getApplicationUserId();
    return this.http.post(`${this.baseUrl}/add?customerId=${userId}&productId=${productId}`, {}, {
      headers: this.getHeaders()
    });
  }

  removeFromWishlist(productId: number): Observable<any> {
    if (!this.checkUserLogin()) return new Observable<any>();

    const userId = this.getApplicationUserId();
    return this.http.delete(`${this.baseUrl}/remove?customerId=${userId}&productId=${productId}`, {
      headers: this.getHeaders()
    });
  }
}
