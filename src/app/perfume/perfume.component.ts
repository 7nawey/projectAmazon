import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ProductsComponent } from '../products/products.component';
import { SubBeautyComponent } from '../sub-beauty/sub-beauty.component';

@Component({
  selector: 'app-perfume',
  imports: [SubBeautyComponent,ProductsComponent],
  templateUrl: './perfume.component.html',
  styleUrl: './perfume.component.css'
})
export class PerfumeComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getPerfume().subscribe(
               (data) => {
                 this.products = data;
                 this.isLoading = false;   
               } 
             );
           }
}
