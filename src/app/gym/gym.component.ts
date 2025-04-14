import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ProductsComponent } from '../products/products.component';
import { SubSportsComponent } from '../sub-sports/sub-sports.component';

@Component({
  selector: 'app-gym',
  imports: [SubSportsComponent,ProductsComponent],
  templateUrl: './gym.component.html',
  styleUrl: './gym.component.css'
})
export class GymComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getGym().subscribe(
               (data) => {
                 console.log(data); 
                 this.products = data;
                 this.isLoading = false;
                 console.log(data);
                 
               }
               
             );
           }
}
