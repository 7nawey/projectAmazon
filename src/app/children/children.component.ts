import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ProductsComponent } from '../products/products.component';
import { CommonModule } from '@angular/common';
import { SubFashoinComponent } from '../sub-fashoin/sub-fashoin.component';

@Component({
  selector: 'app-children',
  imports: [SubFashoinComponent,CommonModule,ProductsComponent],
  templateUrl: './children.component.html',
  styleUrl: './children.component.css'
})
export class ChildrenComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getChildren().subscribe(
               (data) => {
                 console.log(data); 
                 this.products = data;
                 this.isLoading = false;
                 console.log(data);
                 
               }
               
             );
           }
}
