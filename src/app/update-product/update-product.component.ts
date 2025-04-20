import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { NavDashbordComponent } from '../nav-dashbord/nav-dashbord.component';
import { Product } from '../types/product';  // استيراد الواجهة

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavDashbordComponent]
})
export class UpdateProductComponent implements OnInit {
  UpdateProductForm: FormGroup;
  subCategories: any[] = [];
  productID: number = 0; // هذا الرقم سوف نستخدمه للحصول على بيانات المنتج المراد تحديثه

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.UpdateProductForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      priceAfterDiscount: [0, [Validators.required, Validators.min(0)]],
      descreption: ['', Validators.required],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      imgCover: ['', Validators.required],
      sellerName: ['', Validators.required],
      subCategoryName: ['', Validators.required],
      productImages: this.formBuilder.array([
        this.createImageFormGroup()
      ])
    });
  }

  ngOnInit(): void {
    this.productID = +(this.activatedRoute.snapshot.paramMap.get('id') || 0);  // تأكد من تعيين productID بشكل صحيح
    if (this.productID === 0) {
      console.error('Invalid product ID');
      return; // يمكنك إضافة تحقق إضافي هنا
    }
  
    this.getSubCategories();
    this.getProductDetails(this.productID);  // جلب تفاصيل المنتج
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
      next: (data) => {
        this.subCategories = data;
      },
      error: (error) => {
        console.error('Error fetching subcategories:', error);
      }
    });
  }

  getProductDetails(id: number): void {
    this.apiService.getProductById(id).subscribe({
      next: (data: Product) => {
        // تعبئة الـ FormGroup بالنموذج
        this.UpdateProductForm.patchValue({
          name: data.name,
          price: data.price,
          priceAfterDiscount: data.priceAfterDiscount,
          description: data.descreption,
          stockQuantity: data.stockQuantity,
          rating: data.rating,
          imgCover: data.imgCover,
          sellerName: data.sellerName,
          subCategoryName: data.subCategoryName
        });

        // إضافة الصور إلى الـ FormArray
        data.productImages.forEach((image) => {
          this.addImageField(image.imageURL, image.isPrimary);
        });
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      }
    });
  }

  handleUpdateProductForm(): void {
    if (this.UpdateProductForm.invalid) return;
  
    const formData = this.UpdateProductForm.value;
  
    // إضافة productID إلى formData
    formData.productID = this.productID;
  
    this.apiService.updateProduct(formData, this.productID).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `Product "${response.name}" updated successfully`,
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/ProductList']);
        });
      },
      error: (error) => {
        console.error(error);
        // عرض التفاصيل حول الأخطاء التي تم إرجاعها من الخادم
        if (error.error && error.error.errors) {
          for (const field in error.error.errors) {
            console.error(`Error in ${field}: ${error.error.errors[field].join(', ')}`);
          }
        }
        Swal.fire('Error', 'Failed to update product', 'error');
      }
    });
  }
  
  
  
  
}
