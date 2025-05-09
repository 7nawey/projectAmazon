import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router'; 
import { NavDashbordComponent } from '../nav-dashbord/nav-dashbord.component';
import { NoLeadingSpaceValidator } from '../app/validators/no-leading-space';
import { noSpacesValidator } from '../app/validators/no-spaces.validator';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NavDashbordComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  AddCategoryForm: FormGroup;
  fileError: string = '';
  imageBase64 = '';

  constructor(
    private formbuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router 
  ) {
    this.AddCategoryForm = this.formbuilder.group({
      categoryName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(100), noSpacesValidator(),NoLeadingSpaceValidator()]],
      description: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(1000),noSpacesValidator(),NoLeadingSpaceValidator()]],  
      categoryImg: [null, Validators.required]
    });
  }

  get formControls() {
    return this.AddCategoryForm.controls;
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (!file) return;
  
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSizeInMB = 1;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  
    if (!allowedTypes.includes(file.type)) {
      this.fileError = 'File must be an image (jpeg, png, gif, webp)';
      this.imageBase64 = '';
      this.AddCategoryForm.patchValue({ categoryImg: '' });
      this.AddCategoryForm.get('categoryImg')?.markAsTouched(); // 🛑 هنا
      return;
    }
  
    if (file.size > maxSizeInBytes) {
      this.fileError = `File size must not exceed ${maxSizeInMB} MB`;
      this.imageBase64 = '';
      this.AddCategoryForm.patchValue({ categoryImg: '' });
      this.AddCategoryForm.get('categoryImg')?.markAsTouched(); // 🛑 هنا برضو
      return;
    }
  
    this.fileError = '';
    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = reader.result as string;
      this.AddCategoryForm.patchValue({ categoryImg: this.imageBase64 });
      this.AddCategoryForm.get('categoryImg')?.markAsTouched();
    };
    reader.readAsDataURL(file);
  }
  
  
  
  handleAddCategoryForm() {
    if (this.AddCategoryForm.invalid) return;

    this.apiService.addCategory(this.AddCategoryForm.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Category added successfully!',
          confirmButtonText: 'OK'
        }).then(() => {
          this.AddCategoryForm.reset();
          this.imageBase64 = '';
          this.router.navigate(['/CategoryList']); 
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error while adding category.',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
}