

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavDashbordComponent } from '../nav-dashbord/nav-dashbord.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-dashboard',
  imports: [RouterLink, CommonModule, NavDashbordComponent],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.css'
})
export class ProductDashboardComponent implements OnInit {
  products: any[] = [];
  currentPage = 1;
  pageSize = 15;
  totalPages = 0;

  constructor(private productService: ApiService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe(response => {
      this.products = response.data;
      this.totalPages = response.totalPages;
    });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getProducts();
    }
  }

  get pageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  deleteProduct(product: any) {
    const productID = product?.productID;

    if (!productID) {
      console.error('Product ID is undefined!');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productID).subscribe(
          () => {
            this.products = this.products.filter(c => c.productID !== productID);

            Swal.fire(
              'Deleted!',
              'Your product has been deleted.',
              'success'
            );
          },
          (error) => {
            console.error('Error deleting product:', error);
            Swal.fire('Error!', 'There was an error deleting the product.', 'error');
          }
        );
      }
    });
  }
}
