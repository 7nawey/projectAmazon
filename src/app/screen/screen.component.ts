import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { SubElectronicComponent } from '../sub-electronic/sub-electronic.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-screen',
  imports: [SubElectronicComponent,ProductsComponent],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.css'
})
export class ScreenComponent {
 @Input() products: any[] = []; 
         isLoading: boolean = true; 
         constructor(private apiService: ApiService) {}
           
             ngOnInit(): void {
               this.apiService.getScreen().subscribe(
                 (data) => {
                   this.products = data;
                   this.isLoading = false;         
                 }
                 
               );
             }
}
