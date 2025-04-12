import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  imports: [CommonModule,FormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  newPassword: string = '';
  email: string = '';
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {
    // التحقق من وجود التوكن في localStorage
    this.token = localStorage.getItem('auth_token') || ''; // استرجاع التوكن
    this.email = localStorage.getItem('user_email') || ''; // لو كنتِ خزنتي الإيميل أيضًا في localStorage

    // يمكنك إضافة الـ queryParams إذا كنت تحتاجين للإيميل من URL أيضًا
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.email = params['email']; // استرجاع الإيميل من الـ URL إذا كان موجودًا
      }
    });
  }

  onSubmit() {
    // التأكد من إرسال التوكن والباسورد مع الإيميل
    this.auth.resetPassword(this.email, this.token, this.newPassword).subscribe({
      next: () => {
        this.router.navigate(['/login']); // بعد التغيير يرجع للمستخدم إلى صفحة اللوج إن
      },
      error: () => {
        alert('Something went wrong');
      }
    });
  }
}
