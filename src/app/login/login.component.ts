import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule,TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  password: string = '';
  emailOrUserName: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  formValues={
    emailOrUserName: this.emailOrUserName,
    password: this.password
  };

  constructor(private authService: AuthService, private router: Router) {}

  isValidEmailOrUsername(value: string): boolean {
    if (!value) return false;
  
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isUsername = /^[a-zA-Z0-9_]{3,}$/.test(value);
  
    return isEmail || isUsername;
  }
  
  login(): void {
    if (!this.isValidEmailOrUsername(this.formValues.emailOrUserName)) {
      this.errorMessage = 'Enter a valid email or a username with at least 3 characters.';
      return;
    }
  
    const loginData = {
      password: this.formValues.password,
    emailOrUserName: this.formValues.emailOrUserName
    };
  
    this.authService.login(loginData).subscribe({
      next: (response) => {
        // فقط عند الدخول نقوم بحفظ التوكن
        localStorage.setItem('token', response.token);
        this.router.navigate(['']); 
        // window.location.reload();
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