import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get email from query params
    this.email = this.route.snapshot.queryParamMap.get('email') || '';

    this.resetPasswordForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid || !this.email) {
      this.errorMessage = 'Please enter a valid OTP and password.';
      return;
    }

    this.loading = true;

    const data = {
      email: this.email,
      token: this.resetPasswordForm.value['otp'],
      password: this.resetPasswordForm.value['password']
    };

    this.authService.resetPasswordWithOtp(data).subscribe({
      next: () => {
        this.successMessage = 'Password reset successfully. You can now log in.';
        this.errorMessage = '';
        this.resetPasswordForm.reset();
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Something went wrong.';
        this.successMessage = '';
      },
      complete: () => this.loading = false
    });
  }
}

