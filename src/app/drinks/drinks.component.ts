import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { SubGroceryComponent } from '../sub-grocery/sub-grocery.component';
import { ProductsComponent } from '../products/products.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drinks',
  imports: [CommonModule,ProductsComponent,SubGroceryComponent],
  templateUrl: './drinks.component.html',
  styleUrl: './drinks.component.css'
})
export class DrinksComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getdrinks().subscribe(
               (data) => {
                 console.log(data); 
                 this.products = data;
                 this.isLoading = false;
                 console.log(data);
                 
               }
               
             );
           }
}
