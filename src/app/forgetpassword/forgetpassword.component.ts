import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  imports: [CommonModule,FormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
  email: string = '';
  errorMessage: string = '';

  constructor(private api: ApiService, private router: Router ,private auth: AuthService,) {}

  onSubmit() {
    this.auth.verifyEmail(this.email).subscribe({
      next: () => {
        this.router.navigate(['/resetpassword'], { queryParams: { email: this.email } });
      },
      error: () => {
        this.errorMessage = 'Email not found';
      }
    });
  }
}
