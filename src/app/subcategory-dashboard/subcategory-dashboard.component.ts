import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteModalComponent } from '../shared/confirm-delete-modal/confirm-delete-modal.component';
import { Subcategory } from '../types/subcategory';
import Swal from 'sweetalert2';
import { NavDashbordComponent } from '../nav-dashbord/nav-dashbord.component';


@Component({
  selector: 'app-subcategory-dashboard',
  imports: [RouterLink,CommonModule,ConfirmDeleteModalComponent,NavDashbordComponent],
  templateUrl: './subcategory-dashboard.component.html',
  styleUrl: './subcategory-dashboard.component.css'
})
export class SubcategoryDashboardComponent implements OnInit {
  subcategories: Subcategory[] = [];

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

  deleteSubcategory(subcategory: Subcategory) {
    Swal.fire({
      title: ' Are you sure ',
      text: `Do you want to delete"${subcategory?.title}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: ' Yes,Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subcategoryService.deleteSubategory(subcategory.sub_CategoryId).subscribe(
          () => {
            this.subcategories = this.subcategories.filter(
              c => c.sub_CategoryId !== subcategory.sub_CategoryId
            );
  
            Swal.fire({
              title: 'Done !',
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
  

}