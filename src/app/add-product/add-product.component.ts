import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NavDashbordComponent } from '../nav-dashbord/nav-dashbord.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavDashbordComponent]
})
export class AddProductComponent implements OnInit {
  AddProductForm: FormGroup;
  subCategories: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.AddProductForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      priceAfterDiscount: [0, [Validators.required, Validators.min(0)]],
      descreption: ['', Validators.required],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      imgCover: ['', Validators.required],
      sellerName: ['', Validators.required],
      subCategoryName: ['', Validators.required], // ممكن تبقى ID لو بتحبي
      productImages: this.formBuilder.array([
        this.createImageFormGroup()
      ])
    });
  }

  ngOnInit(): void {
    this.getSubCategories();
  }

  get formControls() {
    return this.AddProductForm.controls;
  }

  get productImages(): FormArray {
    return this.AddProductForm.get('productImages') as FormArray;
  }

  createImageFormGroup(): FormGroup {
    return this.formBuilder.group({
      imageURL: ['', Validators.required],
      isPrimary: [false]
    });
  }

  addImageField(): void {
    this.productImages.push(this.createImageFormGroup());
  }

  removeImageField(index: number): void {
    if (this.productImages.length > 1) {
      this.productImages.removeAt(index);
    }
  }

  getSubCategories(): void {
    this.apiService.getAllSubcategories().subscribe({
      next: (data) => {
        this.subCategories = data;
      },
      error: (error) => {
        console.error('Error fetching subcategories:', error);
      }
    });
  }

  handleAddProductForm(): void {
    if (this.AddProductForm.invalid) return;

    const formData = this.AddProductForm.value;

    this.apiService.AddProduct(formData).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `Product "${response.name}" added successfully`,
          confirmButtonText: 'Go to Product List'
        }).then(() => {
          this.router.navigate(['/ProductList']);
        });

        this.AddProductForm.reset();
        while (this.productImages.length > 1) {
          this.productImages.removeAt(1);
        }
      },
      error: () => {
        Swal.fire('Error', 'Failed to add product', 'error');
      }
    });
  }
}
