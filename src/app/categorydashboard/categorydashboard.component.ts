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
  styleUrls: ['./categorydashboard.component.css'] ,
  imports: [CommonModule,RouterModule,ConfirmDeleteModalComponent,NavDashbordComponent],
})
export class CategorydashboardComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: ApiService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }


  selectedCategory!: Category;

  setCategoryToDelete(category: Category) {
    this.selectedCategory = category;
  }
  
  deleteCategory(category: Category) {
    if (!category?.categoryID) {
      console.error('Category ID is undefined!');
      return;
    }
  
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
            Swal.fire('Deleted!', 'Your category has been deleted.', 'success');
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