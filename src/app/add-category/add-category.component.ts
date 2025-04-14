import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import {  FormBuilder, FormGroup, ReactiveFormsModule, FormControl,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-category',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  AddCategoryForm : FormGroup;
  fileError: string = '';
  imageBase64 = '';

  constructor(private formbuilder : FormBuilder, private apiService: ApiService ,private toastr: ToastrService){

    this.AddCategoryForm = this.formbuilder.group({
      categoryName: ['',[Validators.required, Validators.minLength(3)]],
      description: ['',[Validators.required, Validators.minLength(3)]],
      categoryImg: [null, Validators.required]
      },)
}
get formControls() {
  return this.AddCategoryForm.controls;
}

handleFileInput(event: any) {
  const file = event.target.files[0];

  if (!file) return;

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    this.fileError = 'File must be an image (jpeg, png, gif, webp)';
    this.imageBase64 = '';
    this.AddCategoryForm.patchValue({ categoryImg: '' });
    return;
  }

  this.fileError = '';
  const reader = new FileReader();
  reader.onload = () => {
    this.imageBase64 = reader.result as string;
    this.AddCategoryForm.patchValue({ categoryImg: this.imageBase64 });
  };
  reader.readAsDataURL(file);
}

handleAddCategoryForm() {
  if (this.AddCategoryForm.invalid) return;

  this.apiService.addCategory(this.AddCategoryForm.value).subscribe({
    next: () => {
      this.toastr.success('Category added successfully!');
      this.AddCategoryForm.reset();
      this.imageBase64 = '';
    },
    error: () => {
      this.toastr.error('Failed to add category.');
    }
  });
}

}