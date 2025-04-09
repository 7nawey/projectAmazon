import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ProductsComponent } from '../products/products.component';
import { SubBeautyComponent } from '../sub-beauty/sub-beauty.component';

@Component({
  selector: 'app-bodycare',
  imports: [SubBeautyComponent,ProductsComponent],
  templateUrl: './bodycare.component.html',
  styleUrl: './bodycare.component.css'
})
export class BodycareComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getBodycare().subscribe(
               (data) => {
                 this.products = data;
                 this.isLoading = false;   
               } 
             );
           }
}
