import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteModalComponent } from '../shared/confirm-delete-modal/confirm-delete-modal.component';
import { NavDashbordComponent } from '../nav-dashbord/nav-dashbord.component';


@Component({
  selector: 'app-product-dashboard',
  imports: [RouterLink,CommonModule,ConfirmDeleteModalComponent,NavDashbordComponent],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.css'
})
export class ProductDashboardComponent  implements OnInit {
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

    selectedProduct!: any;
  
  setProductToDelete(product: any) {
    this.selectedProduct = product;
  }

 
  
  deleteProduct(product: any) {
    console.log('Selected product:', product);        
    console.log('product ID:', product?.ProductID);         
  
    if (!product?.ProductID) {
      console.error('product ID is undefined!');
      return;
    }
    this.productService.deleteCategory(product.ProductID).subscribe(
      () => {
        this.products = this.products.filter(c => c.ProductID !== product.ProductID);
        // this.showSuccessMessage = true;
        // setTimeout(() => this.showSuccessMessage = false, 3000);
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }



}
