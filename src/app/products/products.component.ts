import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';


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
  successMessage: string = '';
  errorMessage: string = '';
  wishlistIds: number[] = [];

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private router: Router,
    private wishlistService:WishlistService
  ) {}

  ngOnInit(): void {
    this.wishlistService.getWishlist().subscribe(items => {
      this.wishlistIds = items.map((i: { productID: number }) => i.productID);

    }); 
  }


  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }



  toggleWishlist(product: any): void {
    const token = this.getToken(); // Assuming you have this method
  
    if (!token) {
      Swal.fire({
        title: 'Hold up!',
        text: 'Please log in to manage your wishlist.',
        icon: 'warning',
        confirmButtonText: 'Login'
      }).then(() => {
        this.router.navigate(['/login']);
      });
      return;
    }
  
    const isAlreadyInWishlist = this.isInWishlist(product.productID);
  
    const request$ = isAlreadyInWishlist 
      ? this.wishlistService.removeFromWishlist(product.productID)
      : this.wishlistService.addToWishlist(product.productID);
  
    request$.subscribe({
      next: () => {
        this.updateLocalWishlist(product.productID, !isAlreadyInWishlist);
        Swal.fire({
          title: isAlreadyInWishlist ? 'Removed' : 'Added',
          text: `${product.name} has been ${isAlreadyInWishlist ? 'removed from' : 'added to'} your wishlist.`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: () => {
        Swal.fire({
          title: 'Oops!',
          text: 'Something went wrong while updating your wishlist.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    });
  }
  
  
  updateLocalWishlist(productId: number, add: boolean): void {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (add) {
      wishlist.push({ productID: productId });
    } else {
      wishlist = wishlist.filter((item: any) => item.productID !== productId);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
  
  isInWishlist(productId: number): boolean {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return wishlist.some((item: any) => item.productID === productId);
  }

  
  addToCart(product: any): void {
    if (product.stockQuantity <= 0) {
      Swal.fire({
        title: 'Out of Stock',
        text: 'Sorry, this product is out of stock.',
        icon: 'error',

        showConfirmButton: true,
        timer: 1500

      });
      return;
    }

    this.cartService.addToCart(product.productID).subscribe({
      next: () => {
        Swal.fire({
          title: 'Product Added!',
          text: `${product.name} has been added to your cart.`,
          icon: 'success',

          showConfirmButton: true,
          timer: 1500
        });
      },
      error: () => {

        Swal.fire({
          title: 'Failed!',
          text: 'Unable to add the product to your cart.',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
}