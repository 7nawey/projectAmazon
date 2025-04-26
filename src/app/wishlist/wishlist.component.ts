import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';
import { HttpClient } from '@angular/common/http';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink,TranslateModule],  
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];
  isLoading: boolean = false;

  constructor(private wishlistService: WishlistService, private http: HttpClient) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (items) => {
        this.wishlist = items;

        // Fetch product details for each item
        this.wishlist.forEach(item => {
          this.getProductDetails(item.productID);
        });

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getProductDetails(productID: number): void {
    const productUrl = `https://localhost:7105/api/Product/${productID}`;
    this.http.get<any>(productUrl).subscribe({
      next: (product) => {
        // Find the product in the wishlist and update it with fetched details
        const wishlistItem = this.wishlist.find(item => item.productID === productID);
        if (wishlistItem) {
          wishlistItem.name = product.name;
          wishlistItem.price = product.price;
          wishlistItem.imgCover = product.imgCover;
        }
      },
      error: (err) => {
        console.error(`Error fetching product details for ${productID}:`, err);
      }
    });
  }

  removeFromWishlist(product: any): void {
    const index = this.wishlist.findIndex(item => item.productID === product.productID);
    
    if (index !== -1) {
      // Find the DOM element of the product card and add the 'removed' class to trigger animation
      const cardElement = document.getElementById(`product-${product.productID}`);
      if (cardElement) {
        cardElement.classList.add('removed');
      }
  
      // Remove the item from the wishlist array after animation
      setTimeout(() => {
        this.wishlist.splice(index, 1);
      }, 300); // Match this delay with the CSS animation duration (in ms)
      
      // Optionally, remove from localStorage if syncing with it
      let localWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      localWishlist = localWishlist.filter((item: any) => item.productID !== product.productID);
      localStorage.setItem('wishlist', JSON.stringify(localWishlist));
  
      // Call the service to remove the item from the backend
      this.wishlistService.removeFromWishlist(product.productID).subscribe({
        next: () => {
          console.log('Product removed successfully.');
        },
        error: (err) => {
          console.error('Error removing item from wishlist:', err);
        }
      });
    }
  }
  
}

