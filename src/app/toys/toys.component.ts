import { Component, Input } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-toys',
  imports: [ProductsComponent],
  templateUrl: './toys.component.html',
  styleUrl: './toys.component.css'
})
export class ToysComponent {
  @Input() products: any[] = []; 
         isLoading: boolean = true; 
         constructor(private apiService: ApiService) {}
           
             ngOnInit(): void {
               this.apiService.getToys().subscribe(
                 (data) => {
                   this.products = data;
                   this.isLoading = false;         
                 }
                 
               );
             }
}
