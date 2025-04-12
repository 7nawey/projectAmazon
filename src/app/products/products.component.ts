import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';  // استيراد SweetAlert2
import { CommonModule } from '@angular/common';  // استيراد CommonModule
import { Router } from '@angular/router';  // استيراد Router لتوجيه المستخدم
import { RouterLink } from '@angular/router';  // استيراد RouterLink

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,  // لأنه مكون مستقل (standalone)
  imports: [CommonModule, RouterLink]  // تأكد من إضافة CommonModule و RouterLink هنا
})
export class ProductsComponent implements OnInit {
  @Input() products: any[] = [];
  isLoading: boolean = true;

  constructor(private apiService: ApiService, private cartService: CartService, private router: Router) {}  // إضافة الـ Router

  ngOnInit(): void {
    // يمكنك هنا إضافة أي منطق لتحميل البيانات إذا كان لديك
  }

  // دالة لاستخراج التوكن من الـ localStorage
  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  addToCart(product: any): void {
    const token = this.getToken();
    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'You need to log in first.',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(() => {
        // بعد إغلاق التنبيه، سيتم توجيه المستخدم إلى صفحة تسجيل الدخول
        this.router.navigate(['/login']);  // توجيه المستخدم إلى صفحة تسجيل الدخول
      });
      return;
    }

    this.cartService.addToCart(product.productID).subscribe({
      next: () => {
        // استخدام SweetAlert2 لإظهار التنبيه
        Swal.fire({
          title: 'Product Added!',
          text: `${product.name} has been added to your cart.`,
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 3000, // يمكنك تعديل الوقت إذا أردت
        });
      },
      error: (err) => {
        // في حال حدوث خطأ
        Swal.fire({
          title: 'Failed!',
          text: 'Unable to add the product to your cart.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    });
  }
}
