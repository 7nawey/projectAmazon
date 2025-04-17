import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';
import { Category } from '../types/category';
import { Subcategory } from '../types/subcategory';
import { CommonModule } from '@angular/common';
import { NavDashbordComponent } from '../nav-dashbord/nav-dashbord.component';

@Component({
  selector: 'app-update-subcategory',
  templateUrl: './update-subcategory.component.html',
  styleUrls: ['./update-subcategory.component.css'],
  imports:[ReactiveFormsModule,CommonModule,NavDashbordComponent]
})
export class UpdateSubcategoryComponent implements OnInit {
  UpdateSubcategoryForm!: FormGroup;
  categories: Category[] = [];
  sub_CategoryId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private subcategoryService: ApiService
  ) {
    this.UpdateSubcategoryForm = this.fb.group({
      subcategoryName: ['', [Validators.required, Validators.minLength(3)]],
      categoryId: ['', Validators.required]
    });
  }

  get formControls() {
    return this.UpdateSubcategoryForm.controls;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const id = idParam ? +idParam : NaN;

      if (isNaN(id) || id <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid subcategory ID!',
        });
        return;
      }

      this.sub_CategoryId = id;

      this.getCategories();

      this.subcategoryService.getsubcategoryById(this.sub_CategoryId).subscribe(data => {
        this.UpdateSubcategoryForm.patchValue({
          subcategoryName: data.title,
          categoryId: data.categoryId
        });
      });
    });
  }

  getCategories(): void {
    this.subcategoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  handleUpdateSubcategoryForm(): void {
    if (this.UpdateSubcategoryForm.invalid) return;

    const selectedCategory = this.categories.find(cat => cat.categoryID === +this.UpdateSubcategoryForm.value.categoryId);
    const categoryName = selectedCategory ? selectedCategory.categoryName : '';

    const updatedData = {
      sub_CategoryId: this.sub_CategoryId,
      title: this.UpdateSubcategoryForm.value.subcategoryName,
      categoryId: +this.UpdateSubcategoryForm.value.categoryId,
      categoryName: categoryName
    };

    this.subcategoryService.updatesubcategory(this.sub_CategoryId, updatedData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Subcategory Updated',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/SubcategoryList']);
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update subcategory!',
        });
      }
    });
  }
}