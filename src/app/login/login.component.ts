import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router ,RouterModule} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NoLeadingSpaceValidator } from '../app/validators/no-leading-space';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [TranslateModule, ReactiveFormsModule,CommonModule,RouterModule] // تأكد من استيراد TranslateModule هنا إذا كنت تستخدم الترجمة
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    
    this.loginForm = this.fb.group({
      emailOrUserName: [
        '',
        [Validators.required, this.isValidEmailOrUsername,Validators.maxLength(40),this.noSpacesValidator, this.spacebetweenValidator,NoLeadingSpaceValidator()]
      ], 
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),Validators.maxLength(50),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/
          ),
          this.noSpacesValidator, this.spacebetweenValidator,NoLeadingSpaceValidator()
        ], 
      ],
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  
  isValidEmailOrUsername(control: any) {
    const value = control.value;
    if (!value) return null;

    const isEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value);

    const isUsername = /^[a-zA-Z0-9_]{3,}$/.test(value);

    return isEmail || isUsername ? null : { invalidEmailOrUsername: true };
  }
  noSpacesValidator(control: any) {
    const value = control.value;
  
    if (value && !/[a-zA-Z0-9\u0621-\u064A\u0660-\u0669_]/.test(value)) {
      return { noSpaces: true }; 
    }
  
    return null; 
  }
  
  spacebetweenValidator(control: AbstractControl): ValidationErrors | null {
      if (control.value && control.value.includes(' ')) {
        return { spaceBetween: true };  
      }
      return null;  
    }

  
  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: (response) => {
        
        localStorage.setItem('token', response.token);
        this.router.navigate(['']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Login failed, please check your credentials and try again!';
      },
    });
  }
}
