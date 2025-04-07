import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { SubFashoinComponent } from '../sub-fashoin/sub-fashoin.component';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-men',
  imports: [SubFashoinComponent,CommonModule,ProductsComponent],
  templateUrl: './men.component.html',
  styleUrl: './men.component.css'
})
export class MenComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getMen().subscribe(
               (data) => {
                 console.log(data); 
                 this.products = data;
                 this.isLoading = false;
                 console.log(data);
                 
               }
               
             );
           }
}
