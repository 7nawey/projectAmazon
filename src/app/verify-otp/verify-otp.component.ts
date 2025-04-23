import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css'],
  imports: [CommonModule, RouterLink, FormsModule,TranslateModule],
})
export class VerifyOtpComponent {
  email: string = '';
  otp: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  verifyOtp() {
    this.authService.verifyOtp(this.email, this.otp).subscribe({
      next: () => {
        this.successMessage = 'Email verified successfully!';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: () => {
        this.errorMessage = 'Invalid or expired OTP.';
      }
    });
  }
  
}
