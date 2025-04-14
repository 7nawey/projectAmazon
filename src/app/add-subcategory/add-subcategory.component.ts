import { Component } from '@angular/core';
import { Category } from '../types/category';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-subcategory',
  imports: [ReactiveFormsModule],
  templateUrl: './add-subcategory.component.html',
  styleUrl: './add-subcategory.component.css'
})
export class AddSubcategoryComponent {
  AddSubcategoryForm:FormGroup
  categories: Category[] = [];
 
  
  
      constructor(private formbuilder : FormBuilder, private subcategoryService: ApiService,private toastr: ToastrService ){
    
        this.AddSubcategoryForm = this.formbuilder.group({
          subcategoryName: ['',[Validators.required, Validators.minLength(3)]],
          category: [''],
          categoryId: ['', Validators.required]

          },)
    }
    get formControls() {
      return this.AddSubcategoryForm.controls;
    }
    ngOnInit() {
      this.getCategories();
    }

  getCategories() {
    this.subcategoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  handleAddAddSubcategoryForm(){
    if (this.AddSubcategoryForm.invalid) return;

    this.subcategoryService.AddSubcategory(this.AddSubcategoryForm.value).subscribe({
      next: () => {
        this.toastr.success('Subcategory added successfully!');
        this.AddSubcategoryForm.reset();
       
      },
      error: () => {
        this.toastr.error('Failed to add subcategory.');
      }
    });
  }
}
