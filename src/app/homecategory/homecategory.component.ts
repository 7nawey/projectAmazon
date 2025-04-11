import { Component, Input } from '@angular/core';
import { SubHomeComponent } from '../sub-home/sub-home.component';
import { KitchenComponent } from '../kitchen/kitchen.component';
import { ApiService } from '../api.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-homecategory',
  imports: [KitchenComponent,ProductsComponent],
  templateUrl: './homecategory.component.html',
  styleUrl: './homecategory.component.css'
})
export class HomecategoryComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getHomecategory().subscribe(
               (data) => {
                 this.products = data;
                 this.isLoading = false;   
               } 
             );
           }
}
