import { Component, OnInit} from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, FormControl,Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-category',
    imports: [ ReactiveFormsModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent implements OnInit {
  UpdateCategoryForm : FormGroup;
  categoryId!: any ;
  categoryName: string = '';    
  description: string = '';
  categoryImg:any; 
  fileError: string = '';
  imageBase64 = '';

  constructor(private catrgoryService: ApiService, private formbuilder : FormBuilder,private route: ActivatedRoute) {
    this.UpdateCategoryForm = this.formbuilder.group({
      categoryName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      image: [null] 
    });
  }

  get formControls() {
    return this.UpdateCategoryForm.controls;
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
    
      this.categoryId = id;
    });
    
        this.catrgoryService.getCategoryById(this.categoryId).subscribe(data => {
          this.UpdateCategoryForm.patchValue({
            categoryName: data.categoryName,
            description: data.description,
            // this.categoryImg= data.categoryImg;
          });
          this.categoryImg= data.categoryImg;
          this.imageBase64 = data.categoryImg;
        });
      
    // } else {
    //   console.error('ID parameter is missing!');
    // }
    }

  handleFileInput(event: any) {
    const file = event.target.files[0];
  
    if (!file) return;
  
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      this.fileError = 'File must be an image (jpeg, png, gif, webp)';
      this.imageBase64 = '';
      this.UpdateCategoryForm.patchValue({ categoryImg: '' });
      return;
    }
  }
  handleUpdateCategoryForm(): void {

    if (this.UpdateCategoryForm.invalid) return;
  
    const updatedCategory: any = {
      categoryName: this.UpdateCategoryForm.value.categoryName,
      description: this.UpdateCategoryForm.value.description,
      categoryImg: this.imageBase64 || ''
    };
  
    this.catrgoryService.updateCategory(this.categoryId, updatedCategory).subscribe(() => {
  console.log('Category updated!');
});
  

}}