import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { SubHomeComponent } from '../sub-home/sub-home.component';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-bed',
  imports: [SubHomeComponent,CommonModule,ProductsComponent],
  templateUrl: './bed.component.html',
  styleUrl: './bed.component.css'
})
export class BedComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getBed().subscribe(
               (data) => {
                 console.log(data); 
                 this.products = data;
                 this.isLoading = false;
                 console.log(data);
                 
               }
               
             );
           }
}
