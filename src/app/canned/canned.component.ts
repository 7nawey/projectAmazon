import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { SubGroceryComponent } from '../sub-grocery/sub-grocery.component';
import { ProductsComponent } from '../products/products.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-canned',
  imports: [CommonModule,ProductsComponent,SubGroceryComponent],
  templateUrl: './canned.component.html',
  styleUrl: './canned.component.css'
})
export class CannedComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getcanned().subscribe(
               (data) => {
                 console.log(data); 
                 this.products = data;
                 this.isLoading = false;
                 console.log(data);
                 
               }
               
             );
           }
}
