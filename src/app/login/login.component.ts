import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  login() {
    const loginData = {
      userName: this.username, 
      password: this.password,
      email: this.email,
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', response.token); 
        this.router.navigate(['']); 
      },
      error: (error) => {
        this.errorMessage = 'Login failed, please check your credentials and try again!';
      }
    });
  }
}
