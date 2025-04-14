import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, FormControl,Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-product',
  imports: [ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  UpdateProductForm : FormGroup;
  ProductID!: any ;
  categoryName: string = '';    
  description: string = '';
  ImgCover:any; 
  fileError: string = '';
  imageBase64 = '';
  Subcategories:any;

  constructor(private ProductService: ApiService, private formbuilder : FormBuilder,private route: ActivatedRoute) {
    this.UpdateProductForm = this.formbuilder.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.minLength(3)]],
      stockQuantity: ['', [Validators.required,Validators.min(0)]]

      // image: [null] 
    });
  }

  get formControls() {
    return this.UpdateProductForm.controls;
  }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Params:', params);
      const idParam = params['id'];
      console.log('ID Param:', idParam);
      
      if (!idParam) {
        console.error('ID parameter is missing!');
        return;
      }
    
      const id = Number(idParam);
    
      if (isNaN(id)) {
        console.error(`ID is not a valid number: ${idParam}`);
        return;
      }
    
      this.ProductID = id;
    });
    
        this.ProductService.getProductById(this.ProductID).subscribe(data => {
          this.UpdateProductForm.patchValue({
            productName: data.name,
            description: data.description,
            price:data.price
            // this.categoryImg= data.categoryImg;
          });
          this.ImgCover= data.ImgCover;
          this.imageBase64 = data.ImgCover;
        });
      }

      handleFileInput(event: any) {
        const file = event.target.files[0];
      
        if (!file) return;
      
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
          this.fileError = 'File must be an image (jpeg, png, gif, webp)';
          this.imageBase64 = '';
          this.UpdateProductForm.patchValue({ categoryImg: '' });
          return;
        }
      }
      handleUpdateProductForm(): void {
    
        if (this.UpdateProductForm.invalid) return;
      
        const updatedProduct: any = {
          categoryName: this.UpdateProductForm.value.categoryName,
          description: this.UpdateProductForm.value.description,
          categoryImg: this.imageBase64 || ''
        };
      
        this.ProductService.updateProduct(this.ProductID, updatedProduct).subscribe(() => {
      console.log('Product updated!');
    });
      
}

getSubCategories() {
  this.ProductService.getAllSubcategories().subscribe(
    (data) => {
      this.Subcategories = data;
    },
    (error) => {
      console.error('Error fetching categories:', error);
    }
  );
}
}
