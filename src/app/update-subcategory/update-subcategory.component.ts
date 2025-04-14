import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {  FormBuilder, FormGroup, ReactiveFormsModule, FormControl,Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-update-subcategory',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './update-subcategory.component.html',
  styleUrl: './update-subcategory.component.css'
})
export class UpdateSubcategoryComponent {
  UpdateSubcategoryForm:FormGroup
    categories: any[] = [];
    sub_categoryID:any;
   
    
    
        constructor(private formbuilder : FormBuilder, private subcategoryService: ApiService,private route: ActivatedRoute ){
      
          this.UpdateSubcategoryForm = this.formbuilder.group({
            subcategoryName: ['',[Validators.required, Validators.minLength(3)]],
            category: [''],
            categoryId: ['', Validators.required]
  
            },)
      }
      get formControls() {
        return this.UpdateSubcategoryForm.controls;
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
        
          this.sub_categoryID = id;
      
          // ✅ بعد ما الـ id يتحدد، هنا أعمل call للـ API
          this.subcategoryService.getsubcategoryById(this.sub_categoryID).subscribe(data => {
            this.UpdateSubcategoryForm.patchValue({
              subcategoryName: data.title,  // تأكد الأحرف
              categoryId: data.categoryId  // تأكد الأحرف كمان
            });
          });
        });
      
        // كمان هنا لو تحب تجيب كل الكاتيجوريز
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

    handleUpdateSubcategoryForm() {
      if (this.UpdateSubcategoryForm.invalid) return;
    
      const updatedSubcategory = {
        sub_categoryID: this.sub_categoryID, 
        title: this.UpdateSubcategoryForm.value.subcategoryName,
        categoryId: this.UpdateSubcategoryForm.value.categoryId
      };
    
      this.subcategoryService.updatesubcategory(this.sub_categoryID, updatedSubcategory).subscribe({
        next: () => {
          // this.toastr.success('Subcategory updated successfully!');
          this.UpdateSubcategoryForm.reset();
        },
        // error: () => {
        //   this.toastr.error('Failed to update subcategory.');
        // }
      });
    }
    
  }