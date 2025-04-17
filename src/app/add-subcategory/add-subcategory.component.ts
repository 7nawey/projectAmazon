import { Component, OnInit } from '@angular/core';
import { Category } from '../types/category';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NavDashbordComponent } from '../nav-dashbord/nav-dashbord.component';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,NavDashbordComponent]
})
export class AddSubcategoryComponent implements OnInit {
  AddSubcategoryForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private subcategoryService: ApiService,
    private router: Router
  ) {
    this.AddSubcategoryForm = this.formBuilder.group({
      subcategoryName: ['', [Validators.required, Validators.minLength(3)]],
      categoryId: ['', Validators.required]
    });
  }

  get formControls() {
    return this.AddSubcategoryForm.controls;
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.subcategoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
  trackByCategoryId(index: number, item: Category): number {
    return item.categoryID;
  }
  
  handleAddAddSubcategoryForm() {
    if (this.AddSubcategoryForm.invalid) return;

    const selectedCategory = this.categories.find(
      (cat) => cat.categoryID === +this.AddSubcategoryForm.value.categoryId
    );

    if (!selectedCategory) {
      Swal.fire('Error', 'Invalid category selected', 'error');
      return;
    }

    const formData = {
      title: this.AddSubcategoryForm.value.subcategoryName,
      categoryId: selectedCategory.categoryID,
      categoryName: selectedCategory.categoryName
    };

    this.subcategoryService.AddSubcategory(formData).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `Subcategory "${response.title}" added sussessfully`,
          confirmButtonText: 'Go to list'
        }).then(() => {
          this.router.navigate(['/SubcategoryList']);
        });

        this.AddSubcategoryForm.reset();
      },
      error: () => {
        Swal.fire('Error', 'Failed to add subcategory', 'error');
      }
    });
  }
}