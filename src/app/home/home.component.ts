import { Component, inject, Input } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { Router } from '@angular/router';
import { SliderComponent } from '../slider/slider.component';
import { FashoinComponent } from '../fashoin/fashoin.component';
import { ApiService } from '../api.service';
import { SliderHomeComponent } from '../slider-home/slider-home.component';

@Component({
  selector: 'app-home',
  imports: [ProductsComponent,SliderComponent,FashoinComponent,SliderHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService , private router: Router) {}
         
           ngOnInit(): void {
             this.apiService.getPerfume().subscribe(
               (data) => {
                 this.products = data;
                 this.isLoading = false;   
               } 
             );
           }
}
