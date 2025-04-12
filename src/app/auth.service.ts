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
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

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
          if (response.applicationUserId) {
            localStorage.setItem('application_user_id', response.applicationUserId);
          }

          // تحديث حالة الدخول
          this.isLoggedInSubject.next(true);
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed! Please check your credentials.'));
      })
    );
  }

  getApplicationUserId(): string | null {
    // استرجاع applicationUserId من localStorage
    return localStorage.getItem('application_user_id');
  }

  logout(): void {
    // إزالة التوكن وapplicationUserId من localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('application_user_id');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }
  verifyEmail(email: string) {
    return this.http.post(`${this.apiUrl}/SendEmailForForgetPassword?email=${email}`, {});

  }
  
  
  resetPassword(email: string, token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/ResetPassword`, {
      email,
      token,
      password: newPassword
    });
  } 
}
