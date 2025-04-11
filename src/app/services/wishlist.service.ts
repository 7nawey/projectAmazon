import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'https://localhost:7105/api/Wishlist';  

  constructor(private http: HttpClient) {}

  getWishlistByCustomerId(): Observable<any> {
    const applicationUserId = localStorage.getItem('application_user_id');
    console.log('applicationUserId:', applicationUserId);
    if (!applicationUserId) {
      return new Observable(observer => {
        observer.error('User not logged in');
      });
    }
  
    return this.http.get<any>(`${this.apiUrl}/${applicationUserId}`);
  }
}
