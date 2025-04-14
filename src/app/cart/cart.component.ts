import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';  // استيراد Router لتوجيه المستخدم
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class CartComponent implements OnInit {
  userId: string | null = '';
  items: any[] = [];
  isLoading = true;

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {}  // إضافة الـ Router

  ngOnInit(): void {
    // تحديد الـ userId باستخدام AuthService
    this.userId = this.authService.getApplicationUserId();
    console.log('User ID:', this.userId);  // تحقق من userId هنا

    if (!this.userId) {
      // إذا لم يكن المستخدم مسجل دخول، قم بتوجيهه إلى صفحة تسجيل الدخول
      this.router.navigate(['/login']);
      return;
    }

    this.loadCart();
  }

  loadCart() {
    // استدعاء الـ cart من الـ service
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.items = res.items;
        this.isLoading = false;
      },
      error: () => {
        alert('❌ Failed to load cart.');
        this.isLoading = false;
      }
    });
  }

  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getSubTotal(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getTotal(): number {
    return this.getSubTotal();
  }

  removeItem(productId: number): void {
    // إزالة المنتج من السلة
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.items = this.items.filter(item => item.productID !== productId);
    });
  }

  increaseQuantity(item: any): void {
    // زيادة الكمية
    item.quantity++;
    this.cartService.increaseQuantity(item.productID).subscribe({
      error: () => {
        alert('❌ Failed to update quantity.');
        item.quantity--;
      }
    });
  }

  decreaseQuantity(item: any): void {
    // تقليل الكمية
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.decreaseQuantity(item.productID).subscribe({
        error: () => {
          alert('❌ Failed to update quantity.');
          item.quantity++;
        }
      });
    }
  }

  isCartEmpty(): boolean {
    return this.items.length === 0;
  }

  handleZeroQuantity(item: any): boolean {
    return item.quantity === 0;
  }
  placeOrder(): void {
    if (!this.userId) return;
  
    this.cartService.placeOrder(this.userId).subscribe({
      next: () => {
        alert('✅ Order placed successfully!');
        this.router.navigate(['/checkout']);  // توجيه المستخدم إلى صفحة checkout
      },
      error: () => {
        alert('❌ Failed to place order.');
      }
    });
  }
}
