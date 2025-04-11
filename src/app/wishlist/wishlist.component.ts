import { Component } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  wishlist: any[] = []; 
  errorMessage: string = '';

  constructor(private wishlistService: WishlistService, private router: Router) {}

  ngOnInit() {
    this.loadWishlist();  
  }

  loadWishlist(): void {
    this.wishlistService.getWishlistByCustomerId().subscribe({
      next: (response) => {
        this.wishlist = response.items; 
      },
      error: (error) => {
        this.errorMessage = 'There was an error loading your wishlist. Please try again later.';
        console.error('Error loading wishlist:', error);
      }
    });
  }
}
