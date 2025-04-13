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
  successMessage: string = '';
  errorMessage: string = '';


  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {}


  private getToken(): string | null {
    return localStorage.getItem('auth_token');
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

          showConfirmButton: false,
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
