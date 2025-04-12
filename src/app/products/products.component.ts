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

  constructor(private apiService: ApiService, private cartService: CartService, private router: Router , private wishlistService: WishlistService) {}  // إضافة الـ Router

  ngOnInit(): void {
  }
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
        this.router.navigate(['/login']);  
      });
      return;
    }

    this.cartService.addToCart(product.productID).subscribe({
      next: () => {
        Swal.fire({
          title: 'Product Added!',
          text: `${product.name} has been added to your cart.`,
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 3000, 
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
