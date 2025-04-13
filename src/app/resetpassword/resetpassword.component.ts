import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resetpassword',
  standalone: true,  
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  email: string = '';
  token: string = '';
  resetPasswordForm!: FormGroup;  // FormGroup for the form
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];  
    });
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }
    const data = {
      email: this.email,
      token: this.token,  
      password: this.resetPasswordForm.value['password']
    };

    this.authService.resetPassword(data).subscribe({
      next: (res) => {
        alert('Password reset successful!');
        console.log(res);
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Password reset failed.';
      }
    });
  }
}

