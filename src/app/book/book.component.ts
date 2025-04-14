import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-book',
  imports: [ProductsComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  @Input() products: any[] = []; 
         isLoading: boolean = true; 
         constructor(private apiService: ApiService) {}
           
             ngOnInit(): void {
               this.apiService.getBook().subscribe(
                 (data) => {
                   this.products = data;
                   this.isLoading = false;         
                 }
                 
               );
             }
}
