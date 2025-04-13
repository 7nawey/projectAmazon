import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { SubSportsComponent } from '../sub-sports/sub-sports.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-basketball',
  imports: [SubSportsComponent,ProductsComponent],
  templateUrl: './basketball.component.html',
  styleUrl: './basketball.component.css'
})
export class BasketballComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getBasketball().subscribe(
               (data) => {
                 console.log(data); 
                 this.products = data;
                 this.isLoading = false;
                 console.log(data);
                 
               }
               
             );
           }
}
