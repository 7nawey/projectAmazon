
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsComponent } from '../products/products.component';
import { ApiService } from '../api.service';
import { SubGroceryComponent } from '../sub-grocery/sub-grocery.component';

@Component({
  selector: 'app-grocery',
  imports: [CommonModule,RouterLink,ProductsComponent,SubGroceryComponent],
  standalone: true,
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.css'
})
export class GroceryComponent  {
  @Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getGrocerycategory().subscribe(
               (data) => {
                 console.log(data); 
                 this.products = data;
                 this.isLoading = false;
                 console.log(data);
                 
               }
               
             );
           }
}
