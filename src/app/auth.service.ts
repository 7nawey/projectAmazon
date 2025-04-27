

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://kashef.runasp.net/api/Account';
  private jwtHelper: JwtHelperService;

  private isLoggedInSubject: BehaviorSubject<boolean>;
  isLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.jwtHelper = new JwtHelperService();
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private hasToken(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  // دالة للتسجيل
  register(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerData, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(() => error.error || new Error('Registration failed!'));
      })
    );
  }

  // دالة لتسجيل الدخول
  login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
          this.isLoggedInSubject.next(true);
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed! Please check your credentials.'));
      })
    );
  }

  // دالة للحصول على معرّف المستخدم
  getApplicationUserId(): string | null {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.ApplicationUserId || decodedToken?.nameid || null;
  }

  // دالة للحصول على الأدوار من التوكن
  getUserRoles(): string[] {
    const token = localStorage.getItem('auth_token');
    if (!token) return [];

    const decodedToken = this.jwtHelper.decodeToken(token);
    const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (Array.isArray(roles)) {
      return roles;
    } else if (roles) {
      return [roles];
    }
    return [];
  }

  // التحقق من إذا كان المستخدم مسجلاً دخوله
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  // تسجيل الخروج
  logout(): void {
    localStorage.clear();
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  // إرسال رمز OTP لإعادة تعيين كلمة المرور
  verifyEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/SendOtpForResetPassword?email=${email}`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  // التحقق من OTP
  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm-otp`, { email, otp }, {
      headers: this.getAuthHeaders()
    });
  }

  // إعادة تعيين كلمة المرور باستخدام OTP
  resetPasswordWithOtp(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ResetPasswordWithOtp`, data, {
      headers: this.getAuthHeaders()
    });
  }
}
