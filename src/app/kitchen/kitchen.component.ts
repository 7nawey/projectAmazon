import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ProductsComponent } from '../products/products.component';
import { CommonModule } from '@angular/common';
import { SubHomeComponent } from '../sub-home/sub-home.component';

@Component({
  selector: 'app-kitchen',
  imports: [SubHomeComponent,CommonModule,ProductsComponent],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css'
})
export class KitchenComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getKitchen().subscribe(
               (data) => {
                 console.log(data); 
                 this.products = data;
                 this.isLoading = false;
                 console.log(data);
                 
               }
               
             );
           }
}
