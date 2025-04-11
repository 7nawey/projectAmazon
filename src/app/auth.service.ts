import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7105/api/Account';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();  // للمتابعة التفاعلية

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  register(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerData).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(() => new Error('Registration failed!'));
      })
    );
  }

  login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
          this.isLoggedInSubject.next(true);  
          localStorage.setItem('customer_id', response.customerId);
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed! Please check your credentials.'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.isLoggedInSubject.next(false);  // تحديث الحالة عند تسجيل الخروج
    this.router.navigate(['/login']);
  }
}

