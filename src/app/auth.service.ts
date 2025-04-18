import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7105/api/Account';
  private jwtHelper: JwtHelperService;

  private isLoggedInSubject: BehaviorSubject<boolean>;
  isLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.jwtHelper = new JwtHelperService();
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  private hasToken(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  register(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerData).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(() => error.error || new Error('Registration failed!'));
      })
    );
  }

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

  getApplicationUserId(): string | null {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.ApplicationUserId || decodedToken?.nameid || null;
  }

  getUserRoles(): string[] {
    const token = localStorage.getItem('auth_token');
    if (!token) return [];
  
    const decodedToken = this.jwtHelper.decodeToken(token);
    
    // استخدم المسار الصحيح لاستخراج الدور من التوكن
    const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    
    if (Array.isArray(roles)) {
      return roles;
    } else if (roles) {
      return [roles];
    }
    return [];
  }
  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  verifyEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/SendOtpForResetPassword?email=${email}`, {});
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm-otp`, { email, otp });
  }

  resetPasswordWithOtp(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ResetPasswordWithOtp`, data);
  }
}
