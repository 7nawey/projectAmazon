import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../products/products.component';
import { SubGroceryComponent } from '../sub-grocery/sub-grocery.component';

@Component({
  selector: 'app-fruits',
  imports: [CommonModule,ProductsComponent,SubGroceryComponent],
  templateUrl: './fruits.component.html',
  styleUrl: './fruits.component.css'
})
export class FruitsComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getfruits().subscribe(
               (data) => {
                 console.log(data); 
                 this.products = data;
                 this.isLoading = false;
                 console.log(data);
                 
               }
               
             );
           }
}
