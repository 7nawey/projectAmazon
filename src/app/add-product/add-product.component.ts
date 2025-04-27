
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Category } from '../types/category';
import { Subcategory } from '../types/subcategory';
import { NavDashbordComponent } from '../nav-dashbord/nav-dashbord.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { noSpacesValidator } from '../app/validators/no-spaces.validator';
import { NoLeadingSpaceValidator } from '../app/validators/no-leading-space';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [ReactiveFormsModule, CommonModule, NavDashbordComponent,NgIf,NgForOf],
})
export class AddProductComponent implements OnInit {
  addProductForm!: FormGroup;
  categories: Category[] = [];
  subCategories: any[] = [];
  fileErrorCover: string = '';
  fileErrorImg: string[][] = [];



  constructor(private fb: FormBuilder, private apiService: ApiService,private router:Router) {}

  ngOnInit(): void {
    
    this.addProductForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(100), noSpacesValidator(),NoLeadingSpaceValidator()]],
      price: [0, [Validators.required, Validators.min(0)]],
      priceAfterDiscount:[0, [ Validators.min(0)]],
      descreption: ['', [Validators.required, Validators.minLength(9),Validators.maxLength(1000), noSpacesValidator(),NoLeadingSpaceValidator()]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      categoryID: [null, Validators.required],
      sub_categoryID: [null,Validators.required], 
      imgCover: ['', Validators.required],
      productImages: this.fb.array([this.fb.group({ imageURL: ['', Validators.required] })]),
    });
    

    
    this.apiService.getCategoriesAndSubCategories().subscribe(response => {
      this.categories = response.categories;
      this.subCategories = response.subCategories;
    });

    console.log(this.categories);
    console.log(this.subCategories);  

    
    this.addImage();
  }


  
  get productImages(): FormArray {
    return this.addProductForm.get('productImages') as FormArray;
  }
  
  get formControls() {
    return this.addProductForm.controls;
  }

  
  addImage(): void {
    this.productImages.push(this.fb.group({
      imageURL: ['', Validators.required]
    }));
  }

  
  removeImage(index: number): void {
    this.productImages.removeAt(index);
  }

  
  onImgCoverFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
      // التحقق من النوع
      if (!allowedTypes.includes(file.type)) {
        this.fileErrorCover = 'File must be an image (jpeg, png, gif, webp)';
        this.addProductForm.patchValue({ imgCover: null });
        return;
      }
  
      // التحقق من الحجم
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        this.fileErrorCover = 'The image size must not exceed 2MB.';
        this.addProductForm.patchValue({ imgCover: null });
        return;
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        this.addProductForm.patchValue({ imgCover: reader.result }); // حفظ الـ image base64 في الـ FormGroup
        this.fileErrorCover = ''; // إزالة رسالة الخطأ إذا تم تحميل الصورة بنجاح
      };
      reader.readAsDataURL(file);
    }
  }
  
  onImageFileChange(event: any, index: number): void {
    const file = event.target.files[0];

    // التأكد من تهيئة المصفوفة الخاصة بالأخطاء
    if (!this.fileErrorImg[index]) {
      this.fileErrorImg[index] = [];
    }

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

      // التحقق من النوع
      if (!allowedTypes.includes(file.type)) {
        this.fileErrorImg[index].push('File must be an image (jpeg, png, gif, webp)');
        this.productImages.at(index).patchValue({ imageURL: null });
        return;
      }

      // التحقق من الحجم
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        this.fileErrorImg[index].push('The image size must not exceed 2MB.');
        this.productImages.at(index).patchValue({ imageURL: null });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.productImages.at(index).patchValue({ imageURL: reader.result });
        this.fileErrorImg[index] = []; // إزالة الأخطاء عند تحميل الصورة بنجاح
      };
      reader.readAsDataURL(file);
    }
  }
  
  
  
  handleAddProductForm(): void {
    if (this.addProductForm.invalid) {
      return;
    }
  
    const formData = {
      ...this.addProductForm.value,
      categoryID: +this.addProductForm.value.categoryID,  
      sub_categoryID: +this.addProductForm.value.sub_categoryID, 
      price: +this.addProductForm.value.price,
      priceAfterDiscount: +this.addProductForm.value.priceAfterDiscount,
      stockQuantity: +this.addProductForm.value.stockQuantity,
      rating: +this.addProductForm.value.rating,
    };
  
    console.log('Form data before sending:', formData); 
  
    this.apiService.addProduct(formData).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Product Added',
          text: `"${res.name}" has been added successfully!`,
          confirmButtonColor: '#3085d6',
        }).then(()=>{this.router.navigate(['/ProductList'])});
        this.addProductForm.reset();
        this.productImages.clear();
        this.addImage();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while adding the product.',
          confirmButtonColor: '#d33',
        });
        console.error("Error adding product", err);
      }
    });
  }
}
