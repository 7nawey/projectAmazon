import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ProductsComponent } from '../products/products.component';
import { SubSportsComponent } from '../sub-sports/sub-sports.component';

@Component({
  selector: 'app-sports',
  imports: [ProductsComponent,SubSportsComponent],
  templateUrl: './sports.component.html',
  styleUrl: './sports.component.css'
})
export class SportsComponent {
  @Input() products: any[] = []; 
         isLoading: boolean = true; 
         constructor(private apiService: ApiService) {}
           
             ngOnInit(): void {
               this.apiService.getSportscategory().subscribe(
                 (data) => {
                   this.products = data;
                   this.isLoading = false;         
                 }
                 
               );
             }
}
