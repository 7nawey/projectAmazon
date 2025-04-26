import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink,TranslateModule]
})
export class CartComponent implements OnInit {
  items: any[] = [];
  isLoading = true;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.items = res.items;
        this.isLoading = false;
      },
      error: () => {
        alert('❌ Failed to load cart.');
        this.isLoading = false;
        this.router.navigate(['/login']);
      }
    });
  }

  getSubTotal(): number {
    return this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  getTotal(): number {
    return this.items.reduce((total, item) => {
      const discountedPrice = item.price * (1 - item.discountPercentage);
      return total + (discountedPrice * item.quantity);
    }, 0);
  }

  getTotalDiscount(): number {
    return this.getSubTotal() - this.getTotal();
  }

  getItemsCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }
  

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.items = this.items.filter(item => item.productID !== productId);
    });
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    this.cartService.increaseQuantity(item.productID).subscribe({
      error: () => {
        alert('❌ Failed to update quantity.');
        item.quantity--;
      }
    });
  }

  decreaseQuantity(item: any): void {
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
    this.cartService.placeOrder().subscribe({
      next: () => {
        alert('✅ Order placed successfully!');
        localStorage.removeItem('shippingId');
        this.router.navigate(['/checkout']);
      },
      error: () => {
        alert('❌ Failed to place order.');
      }
    });
  }
}
