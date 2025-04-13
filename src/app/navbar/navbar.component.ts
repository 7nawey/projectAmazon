import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  cartItemCount: number = 0;
  cart$: Observable<any>;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.cart$ = this.cartService.cart$;
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;

      if (this.isLoggedIn) {
        // ✅ تحديث cart مباشرة بعد تسجيل الدخول
        this.cartService.updateCart();
      } else {
        this.cartItemCount = 0;
      }
    });

    this.cart$.subscribe(cart => {
      this.cartItemCount = cart ? cart.items.length : 0;
    });
  }

  logout(): void {
    this.authService.logout();
    this.cartItemCount = 0;
  }
}
