import { Component, inject, Input } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { HttpClient } from '@angular/common/http';
import { SliderComponent } from '../slider/slider.component';
import { FashoinComponent } from '../fashoin/fashoin.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  imports: [ProductsComponent,SliderComponent,FashoinComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService) {}
         
           ngOnInit(): void {
             this.apiService.getPerfume().subscribe(
               (data) => {
                 this.products = data;
                 this.isLoading = false;   
               } 
             );
           }
}
