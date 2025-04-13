import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class ProductsComponent implements OnInit {
  @Input() products: any[] = [];
  isLoading: boolean = true;

  constructor(private apiService: ApiService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // هنا يمكنك إضافة أي منطق لتحميل البيانات إذا كان لديك
  }

  // دالة لاستخراج التوكن من الـ localStorage
  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
  addToCart(product: any): void {
    console.log('Product Stock:', product.stockQuantity);  // تحقق من المخزون في الكونسول
    if (product.stockQuantity <= 0) {
      Swal.fire({
        title: 'Out of Stock',
        text: 'Sorry, this product is out of stock.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
  
    // إذا كانت الكمية متاحة، يتم إضافة المنتج إلى السلة
    this.cartService.addToCart(product.productID).subscribe({
      next: () => {
        Swal.fire({
          title: 'Product Added!',
          text: `${product.name} has been added to your cart.`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
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
