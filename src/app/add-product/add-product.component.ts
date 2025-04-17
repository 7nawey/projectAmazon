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
  AddProductForm: FormGroup;
  fileError: string = '';
  imageBase64: string = '';
  subcategories: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ProductService: ApiService,
    private toastr: ToastrService
  ) {
    this.AddProductForm = this.formBuilder.group({
      categoryName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(0)]],
      sellerName: ['', Validators.required],
      stockQuantity: [null, [Validators.required, Validators.min(1)]],
      imgCover: ['', Validators.required],
      subCategoryName: ['', Validators.required],
      zip: [''],
      categoryImg: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllSubCategories();
  }

  getAllSubCategories() {
    this.ProductService.getAllSubcategories().subscribe({
      next: (res) => {
        this.subcategories = res;
      },
      error: (err) => {
        this.toastr.error('Failed to load subcategories');
      }
    });
  }

  handleAddProductForm() {
    if (this.AddProductForm.invalid) {
      this.toastr.error('Please fill the form correctly');
      return;
    }
  
    const formData = { ...this.AddProductForm.value, categoryImg: this.imageBase64 };
  
    this.ProductService.addProduct(formData).subscribe({
      next: () => {
        this.toastr.success('Product added successfully!');
        this.AddProductForm.reset();
        this.imageBase64 = '';
      },
      error: () => {
        this.toastr.error('Failed to add product');
      }
    });
  }
  
}