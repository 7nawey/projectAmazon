import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { SubHomeComponent } from '../sub-home/sub-home.component';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-living',
  imports: [SubHomeComponent,CommonModule,ProductsComponent],
  templateUrl: './living.component.html',
  styleUrl: './living.component.css'
})
export class LivingComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getLiving().subscribe(
               (data) => {
                 console.log(data); 
                 this.products = data;
                 this.isLoading = false;
                 console.log(data);
                 
               }
              )}
}
