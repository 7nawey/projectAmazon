
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';
import { Product } from '../types/product';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavDashbordComponent } from '../nav-dashbord/nav-dashbord.component';
import { Subcategory } from '../types/subcategory';
import { noSpacesValidator } from '../app/validators/no-spaces.validator';
import { NoLeadingSpaceValidator } from '../app/validators/no-leading-space';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavDashbordComponent]
})
export class UpdateProductComponent implements OnInit {
  UpdateProductForm: FormGroup;
  subCategories: Subcategory[] = [];
  productID: number = 0;
  imgCover = '';
  coverImageError: string = '';
  productImagesErrors: string[] = [];



  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.UpdateProductForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(100),noSpacesValidator(),NoLeadingSpaceValidator()]],
      price: [0, [Validators.required, Validators.min(0)]],
      priceAfterDiscount: [0],
      descreption: ['', [Validators.required, Validators.minLength(9),Validators.maxLength(1000),noSpacesValidator(),NoLeadingSpaceValidator()]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      imgCover: ['', Validators.required],
      categoryID: [null, Validators.required],
      sub_categoryID: [null, Validators.required],
      productImages: this.formBuilder.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.productID = +(this.activatedRoute.snapshot.paramMap.get('id') || 0);
    this.getSubCategories();
    this.getProductDetails(this.productID);
  }
  get formControls() {
    return this.UpdateProductForm.controls;
  }
  get productImages(): FormArray {
    return this.UpdateProductForm.get('productImages') as FormArray;
  }

  createImageFormGroup(imageURL: string = '', isPrimary: boolean = false): FormGroup {
    return this.formBuilder.group({
      imageURL: [imageURL, Validators.required],
      isPrimary: [isPrimary]
    });
  }

  addImageField(imageURL: string = '', isPrimary: boolean = false): void {
    this.productImages.push(this.createImageFormGroup(imageURL, isPrimary));
  }

  removeImageField(index: number): void {
    if (this.productImages.length > 1) {
      this.productImages.removeAt(index);
    }
  }

  getSubCategories(): void {
    this.apiService.getAllSubcategories().subscribe({
      next: (data) => this.subCategories = data,
      error: (err) => console.error('Failed to fetch subcategories', err)
    });
  }

  getProductDetails(id: number): void {
    this.apiService.getProductById(id).subscribe({
      next: (data: Product) => {
        this.UpdateProductForm.patchValue({
          name: data.name,
          price: data.price,
          priceAfterDiscount: data.priceAfterDiscount,
          descreption: data.descreption,
          stockQuantity: data.stockQuantity,
          rating: data.rating,
          imgCover: data.imgCover,
          categoryID: data.categoryID,
          sub_categoryID: data.sub_categoryID
        });
        this.imgCover = data.imgCover;

        this.productImages.clear();
        if (data.productImages && data.productImages.length > 0) {
          data.productImages.forEach(img => {
            this.addImageField(img.imageURL, img.isPrimary);
          });
        }
      },
      error: (err) => console.error('Failed to load product', err)
    });
  }

  onCoverImageChange(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
  
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
    // تحقق من نوع الصورة
    if (!allowedTypes.includes(file.type)) {
      this.coverImageError = 'Only JPEG, PNG, GIF, and WEBP images are allowed.';
      return;
    }
  
    // تحقق من حجم الصورة (مثال: الحد الأقصى 2 ميجابايت)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      this.coverImageError = 'The image size must not exceed 2MB.';
      return;
    }
  
    this.coverImageError = ''; // Clear error if valid
  
    const reader = new FileReader();
    reader.onload = () => {
      this.UpdateProductForm.patchValue({ imgCover: reader.result as string });
      this.imgCover = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  
  

  onProductImageChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (!file) return;
  
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
  
    // التحقق من نوع الصورة
    if (!allowedTypes.includes(file.type)) {
      this.productImagesErrors[index] = 'Only JPEG, PNG, GIF, and WEBP images are allowed.';
      return;
    }
  
    // التحقق من حجم الصورة
    if (file.size > maxSize) {
      this.productImagesErrors[index] = 'Image size should not exceed 2MB.';
      return;
    }
  
    // Clear error if valid
    this.productImagesErrors[index] = '';
  
    const reader = new FileReader();
    reader.onload = () => {
      this.productImages.at(index).patchValue({ imageURL: reader.result as string });
    };
    reader.readAsDataURL(file);
  }
  
  

  handleUpdateProductForm(): void {
    if (this.UpdateProductForm.invalid) return;

    const formData = {
      ...this.UpdateProductForm.value,
      productID: this.productID
    };

    this.apiService.updateProduct(formData, this.productID).subscribe({
      next: (res) => {
        Swal.fire('Success', `Product "${res.name}" updated successfully`, 'success')
          .then(() => this.router.navigate(['/ProductList']));
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'Failed to update product', 'error');
      }
    });
  }
}
