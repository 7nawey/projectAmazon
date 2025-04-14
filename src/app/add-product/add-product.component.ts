import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import {  FormBuilder, FormGroup, ReactiveFormsModule, FormControl,Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { NavDashbordComponent } from '../nav-dashbord/nav-dashbord.component';



@Component({
  selector: 'app-add-product',
  imports: [ProductsComponent,ReactiveFormsModule,NavDashbordComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  AddProductForm : FormGroup;
    fileError: string = '';
    imageBase64 = '';
  
    constructor(private formbuilder : FormBuilder, private ProductService: ApiService ,private toastr: ToastrService){
  
      this.AddProductForm = this.formbuilder.group({
        categoryName: ['',[Validators.required, Validators.minLength(3)]],
        description: ['',[Validators.required, Validators.minLength(3)]],
        categoryImg: [null, Validators.required]
        },)
  }
  get formControls() {
    return this.AddProductForm.controls;
  }
  handleAddProductForm(){}
}
