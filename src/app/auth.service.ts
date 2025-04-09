import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7105/api/Account'; 

  constructor(private http: HttpClient, private router: Router) {}  // Inject Router here

  register(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerData); 
  }

  login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData); 
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);  // Now this will work
  }
}

