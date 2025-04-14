import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteModalComponent } from '../shared/confirm-delete-modal/confirm-delete-modal.component';
import { NavDashbordComponent } from '../nav-dashbord/nav-dashbord.component';


@Component({
  selector: 'app-subcategory-dashboard',
  imports: [RouterLink,CommonModule,ConfirmDeleteModalComponent,NavDashbordComponent],
  templateUrl: './subcategory-dashboard.component.html',
  styleUrl: './subcategory-dashboard.component.css'
})
export class SubcategoryDashboardComponent implements OnInit {
  subcategories: any[] = [];

  constructor(private subcategoryService: ApiService) {}

  ngOnInit() {
    this.getSubcategories();
  }

  getSubcategories() {
    this.subcategoryService.getAllSubcategories().subscribe(
      (data) => {
        this.subcategories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }


selectedSubcategory!: any;

setCategoryToDelete(subcategories: any) {
  this.selectedSubcategory = subcategories;
}

deleteSubcategory(subcategory: any) {
  console.log('Selected subcategory:', subcategory);        
  console.log('subcategory ID:', subcategory?.sub_categoryID);         

  if (!subcategory?.sub_categoryID) {
    console.error('subcategory ID is undefined!');
    return;
  }

  this.subcategoryService.deleteSubategory(subcategory.sub_categoryID).subscribe(
    () => {
      this.subcategories = this.subcategories.filter(c => c.sub_categoryID !== subcategory.sub_categoryID);
    },
    (error) => {
      console.error('Error deleting subcategory:', error);
    }
  );
}

}
