

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';
import { Subcategory } from '../types/subcategory';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteModalComponent } from '../shared/confirm-delete-modal/confirm-delete-modal.component';
import { NavDashbordComponent } from '../nav-dashbord/nav-dashbord.component';

@Component({
  selector: 'app-subcategory-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, ConfirmDeleteModalComponent, NavDashbordComponent],
  templateUrl: './subcategory-dashboard.component.html',
  styleUrls: ['./subcategory-dashboard.component.css']
})
export class SubcategoryDashboardComponent implements OnInit {
  subcategories: Subcategory[] = [];
  currentPage: number = 1;
  pageSize: number = 10; 
  totalItems: number = 0; 
  totalPages: number = 0; 
  pageNumbers: number[] = []; 

  constructor(private subcategoryService: ApiService) {}

  ngOnInit() {
    this.getSubcategories();
  }

  getSubcategories() {
    this.subcategoryService.getSubCategories(this.currentPage, this.pageSize).subscribe(
      (data) => {
        this.subcategories = data.category;  
        this.totalItems = data.totalCount;  
        this.totalPages = data.totalPages;  

        
        this.pageNumbers = Array.from({ length: this.totalPages }, (_, index) => index + 1);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  deleteSubcategory(subcategory: Subcategory) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${subcategory?.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subcategoryService.deleteSubategory(subcategory.sub_CategoryId).subscribe(
          () => {
            this.subcategories = this.subcategories.filter(
              c => c.sub_CategoryId !== subcategory.sub_CategoryId
            );

            Swal.fire({
              title: 'Done!',
              text: 'Subcategory has been deleted successfully.',
              icon: 'success',
              confirmButtonText: 'Yes, Done'
            });
          },
          (error) => {
            console.error('Error deleting subcategory:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Error while deleting subcategory.',
              icon: 'error',
              confirmButtonText: 'Yes'
            });
          }
        );
      }
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getSubcategories();  
    }
  }
}