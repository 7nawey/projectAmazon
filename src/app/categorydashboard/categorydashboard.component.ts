import { Component, OnInit } from '@angular/core';
import { Category } from '../types/category';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmDeleteModalComponent } from '../shared/confirm-delete-modal/confirm-delete-modal.component';
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

setCategoryToDelete(categories: Category) {
  this.selectedCategory = categories;
}

deleteCategory(category: Category) {
  console.log('Selected category:', category);        
  console.log('Category ID:', category?.categoryID);         

  if (!category?.categoryID) {
    console.error('Category ID is undefined!');
    return;
  }

  this.categoryService.deleteCategory(category.categoryID).subscribe(
    () => {
      this.categories = this.categories.filter(c => c.categoryID !== category.categoryID);
      // this.showSuccessMessage = true;
      // setTimeout(() => this.showSuccessMessage = false, 3000);
    },
    (error) => {
      console.error('Error deleting category:', error);
    }
  );
}


}

