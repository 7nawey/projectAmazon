import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../services/wishlist.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink,FormsModule,CommonModule],

  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  cartItemCount: number = 0;
  cart$: Observable<any>;
  isAdmin: boolean = false;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private apiService: ApiService,
    private wishlistService:WishlistService
  ) {
    this.cart$ = this.cartService.cart$;
  }

  ngOnInit(): void {

    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;

      if (this.isLoggedIn) {

        this.cartService.updateCart();
      } else {
        this.cartItemCount = 0;
      }
    })
    
    
    const role = localStorage.getItem('role');
    console.log('Role from localStorage:', role); // تأكد من القراءة الصحيحة
    this.isAdmin = role === 'Admin'; 

    this.cart$.subscribe(cart => {
      this.cartItemCount = cart ? cart.items.length : 0;
    });
  }

  logout(): void {

    this.authService.logout();
    this.cartItemCount = 0;
    this.isAdmin = false;
  }
  
  searchTerm = '';

onSearch() {
  if (this.searchTerm.trim()) {
    this.router.navigate(['/search'], {
      queryParams: { query: this.searchTerm }
    });
  }
}




}
