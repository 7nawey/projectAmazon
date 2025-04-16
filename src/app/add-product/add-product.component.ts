import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { NavDashbordComponent } from '../nav-dashbord/nav-dashbord.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, NavDashbordComponent, ProductsComponent],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  // AddProductForm: FormGroup;
  // fileError: string = '';
  // imageBase64: string = '';

  // constructor(
  //   private formBuilder: FormBuilder,
  //   private ProductService: ApiService,
  //   private toastr: ToastrService
  // ) {
  //   this.AddProductForm = this.formBuilder.group({
  //     categoryName: ['', [Validators.required, Validators.minLength(3)]],
  //     description: ['', [Validators.required, Validators.minLength(3)]],
  //     price: [null, [Validators.required, Validators.min(0)]],
  //     sellerName: ['', Validators.required],
  //     stockQuantity: [null, [Validators.required, Validators.min(1)]],
  //     imgCover: ['', Validators.required],
  //     subCategoryName: ['', Validators.required],
  //     zip: [''],
  //     categoryImg: [null, Validators.required]
  //   });
  // }

  // get formControls() {
  //   return this.AddProductForm.controls;
  // }

  // handleAddProductForm() {
  //   if (this.AddProductForm.invalid) {
  //     this.toastr.error('Please fill the form correctly');
  //     return;
  //   }

  //   const formData = { ...this.AddProductForm.value, categoryImg: this.imageBase64 };

  //   this.ProductService.addProduct(formData).subscribe({
  //     next: () => {
  //       this.toastr.success('Product added successfully!');
  //       this.AddProductForm.reset();
  //       this.imageBase64 = '';
  //     },
  //     error: () => {
  //       this.toastr.error('Failed to add product');
  //     }
  //   });
  // }

  // onImageChange(event: any) {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  //   if (!allowedTypes.includes(file.type)) {
  //     this.fileError = 'Only JPG, JPEG, or PNG formats are allowed';
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imageBase64 = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }
}
