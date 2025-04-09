import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { SubElectronicComponent } from '../sub-electronic/sub-electronic.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-laptop',
  imports: [SubElectronicComponent,ProductsComponent],
  templateUrl: './laptop.component.html',
  styleUrl: './laptop.component.css'
})
export class LaptopComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getLaptop().subscribe(
               (data) => {
                 console.log(data); 
                 this.products = data;
                 this.isLoading = false;
                 console.log(data);
                 
               }
               
             );
           }
}
