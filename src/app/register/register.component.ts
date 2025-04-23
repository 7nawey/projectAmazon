import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule,TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    // التحقق من تطابق كلمات المرور
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    if (this.password.length < 8 || this.password.length > 20) {
      this.errorMessage = 'Password must be between 8 and 20 characters.';
      return;
    }    

    const registerData = {
      userName: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.successMessage = 'Registration successful! Please check your email for the verification code.';
        
        // إزالة أي تخزين محلي غير ضروري
        localStorage.clear();
        
        // توجيه المستخدم لصفحة التحقق من OTP بعد تأخير بسيط
        setTimeout(() => {
          this.router.navigate(['/verify-otp'], { 
            queryParams: { email: this.email },
            replaceUrl: true // لمنع العودة إلى صفحة التسجيل
          });
        }, 2000);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.errorMessage = error.error?.message || 'Registration failed, please try again!';
      }
    });
  }
  
  ngOnInit(): void {
    // إذا كان المستخدم مسجل دخول بالفعل، نوجهه للصفحة الرئيسية
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  } 
}