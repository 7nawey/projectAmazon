
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NoLeadingSpaceValidator } from '../app/validators/no-leading-space';

@Component({
  selector: 'app-register',

  imports: [CommonModule, FormsModule,TranslateModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

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
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), this.noSpacesValidator, this.spacebetweenValidator,NoLeadingSpaceValidator()]],
      email: ['', [Validators.required, Validators.email,this.noSpacesValidator,this.spacebetweenValidator,NoLeadingSpaceValidator()]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),Validators.maxLength(50),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,20}$'),this.noSpacesValidator,this.spacebetweenValidator,NoLeadingSpaceValidator()
      ]],
      confirmPassword: ['', Validators.required]
    });


    this.registerForm.get('confirmPassword')?.setValidators([
      Validators.required,
      this.passwordMatchValidator.bind(this),this.noSpacesValidator
    ]);
  }

  passwordMatchValidator(control: any) {
    if (control.value !== this.registerForm.get('password')?.value) {
      return { compare: true };
    }
    return null;
  }
  noSpacesValidator(control: any) {
    const value = control.value;

    
    if (value && !/[a-zA-Z0-9\u0621-\u064A\u0660-\u0669_]/.test(value) )  {
      return { noSpaces: true }; 
    }

    return null; 
  }
  spacebetweenValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.includes(' ')) {
      return { spacebetweenValidator: true };  
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