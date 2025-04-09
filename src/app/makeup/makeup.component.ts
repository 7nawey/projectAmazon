import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ProductsComponent } from '../products/products.component';
import { SubBeautyComponent } from '../sub-beauty/sub-beauty.component';

@Component({
  selector: 'app-makeup',
  imports: [SubBeautyComponent,ProductsComponent],
  templateUrl: './makeup.component.html',
  styleUrl: './makeup.component.css'
})
export class MakeupComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getMakeup().subscribe(
               (data) => {
                 this.products = data;
                 this.isLoading = false;   
               } 
             );
           }
}
