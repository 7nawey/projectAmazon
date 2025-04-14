import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { SubElectronicComponent } from '../sub-electronic/sub-electronic.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-accesories',
  imports: [SubElectronicComponent,ProductsComponent],
  templateUrl: './accesories.component.html',
  styleUrl: './accesories.component.css'
})
export class AccesoriesComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getaccesories().subscribe(
               (data) => {
                 console.log(data); 
                 this.products = data;
                 this.isLoading = false;
                 console.log(data);
                 
               }
               
             );
           }
}
