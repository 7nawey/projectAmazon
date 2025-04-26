

import { Component, OnInit } from '@angular/core';
import { Category } from '../types/category';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmDeleteModalComponent } from '../shared/confirm-delete-modal/confirm-delete-modal.component';
import Swal from 'sweetalert2';
import { NavDashbordComponent } from '../nav-dashbord/nav-dashbord.component';

@Component({
  selector: 'app-categorydashboard',
  templateUrl: './categorydashboard.component.html',
  styleUrls: ['./categorydashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, NavDashbordComponent],
})
export class CategorydashboardComponent implements OnInit {
  categories: Category[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  pageNumbers: number[] = [];

  constructor(private categoryService: ApiService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategoriesPagination(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.categories = response.category;
        this.totalItems = response.totalCount;
        this.totalPages = response.totalPages;
        this.pageNumbers = Array.from({ length: this.totalPages }, (_, index) => index + 1);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getCategories();
    }
  }

  deleteCategory(category: Category) {
    if (!category?.categoryID) return;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to restore this again!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(category.categoryID).subscribe(
          () => {
            this.categories = this.categories.filter(c => c.categoryID !== category.categoryID);
            Swal.fire('Deleted!', 'Category has been deleted.', 'success');
          },
          (error) => {
            console.error('Error deleting category:', error);
            Swal.fire('Error!', 'There was an issue deleting the category.', 'error');
          }
        );
      }
    });
  }
}
