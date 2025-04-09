import { Component, Input } from '@angular/core';
import { SubBeautyComponent } from '../sub-beauty/sub-beauty.component';
import { ProductsComponent } from '../products/products.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-skincare',
  imports: [SubBeautyComponent,ProductsComponent],
  templateUrl: './skincare.component.html',
  styleUrl: './skincare.component.css'
})
export class SkincareComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getSkincare().subscribe(
               (data) => {
                 this.products = data;
                 this.isLoading = false;   
               } 
             );
           }
}
