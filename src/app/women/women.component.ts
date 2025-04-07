import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ProductsComponent } from '../products/products.component';
import { CommonModule } from '@angular/common';
import { SubFashoinComponent } from '../sub-fashoin/sub-fashoin.component';

@Component({
  selector: 'app-women',
  imports: [SubFashoinComponent,CommonModule,ProductsComponent],
  templateUrl: './women.component.html',
  styleUrl: './women.component.css'
})
export class WomenComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getWomen().subscribe(
               (data) => {
                 console.log(data); 
                 this.products = data;
                 this.isLoading = false;
                 console.log(data);
                 
               }
               
             );
           }
}
