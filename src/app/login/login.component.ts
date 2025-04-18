import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  password: string = '';
  emailOrUserName: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const loginData = {
      password: this.password,
      emailOrUserName: this.emailOrUserName
    };
  
    this.authService.login(loginData).subscribe({
      next: (response) => {
        // فقط عند الدخول نقوم بحفظ التوكن
        localStorage.setItem('token', response.token);
        this.router.navigate(['']); 
        window.location.reload();
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Login failed, please check your credentials and try again!';
      }
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }
}