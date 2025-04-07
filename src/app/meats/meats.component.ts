import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { GroceryComponent } from '../grocery/grocery.component';
import { ProductsComponent } from '../products/products.component';
import { SubGroceryComponent } from '../sub-grocery/sub-grocery.component';

@Component({
  selector: 'app-meats',
  imports: [CommonModule,ProductsComponent,SubGroceryComponent],
  templateUrl: './meats.component.html',
  styleUrl: './meats.component.css'
})
export class MeatsComponent {
 @Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getmeats().subscribe(
               (data) => {
                 console.log(data); 
                 this.products = data;
                 this.isLoading = false;
                 console.log(data);
                 
               }
               
             );
           }
}
