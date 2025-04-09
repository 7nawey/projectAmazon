import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
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
    const registerData = {
      userName: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };
    if (this.password.length < 8 || this.password.length > 20) {
      this.errorMessage = 'Password must be between 8 and 20 characters.';
      return;
    }    
    this.authService.register(registerData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.successMessage = 'Registration successful! Redirecting to login page...';
        setTimeout(() => {
          this.router.navigate(['/login']); 
        }, 2000); 
      },
      error: (error) => {
        console.error('Registration failed', error.error.errors);
        this.errorMessage = 'Registration failed, please try again!';
      }
    });
    localStorage.clear();
  }
    
  
}
