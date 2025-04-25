
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule,CommonModule],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;  
  errorMessages: string[] = [];  
  successMessage: string = '';  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,20}$')
      ]],
      confirmPassword: ['', Validators.required]
    });


    this.registerForm.get('confirmPassword')?.setValidators([
      Validators.required,
      this.passwordMatchValidator.bind(this)
    ]);
  }

  passwordMatchValidator(control: any) {
    if (control.value !== this.registerForm.get('password')?.value) {
      return { compare: true };
    }
    return null;
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const registerData = {
      userName: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.successMessage = 'Registration successful! Please check your email for the verification code.';
        
       
        setTimeout(() => {
          this.router.navigate(['/verify-otp'], { queryParams: { email: this.registerForm.value.email } });  
        }, 2000);
      },
      error: (error) => {
        console.error('Registration failed', error);
      
        if (error.error?.errors && Array.isArray(error.error.errors)) {
          this.errorMessages = error.error.errors;
        } else if (error.error?.message) {
          this.errorMessages = [error.error.message];
        } else if (error.message) {
          this.errorMessages = [error.message]; 
        } else {
          this.errorMessages = ['Registration failed, please try again!'];
        }
      }
      
    });
  }
}