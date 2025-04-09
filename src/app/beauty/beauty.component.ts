import { Component, Input } from '@angular/core';
import { SubBeautyComponent } from '../sub-beauty/sub-beauty.component';
import { ApiService } from '../api.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-beauty',
  imports: [SubBeautyComponent,ProductsComponent],
  templateUrl: './beauty.component.html',
  styleUrl: './beauty.component.css'
})
export class BeautyComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService
       ) {}
         
           ngOnInit(): void {
             this.apiService.getBeautycategory().subscribe(
               (data) => {
                 this.products = data;
                 this.isLoading = false;   
               } 
             );
           }
}
