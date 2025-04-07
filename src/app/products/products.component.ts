
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  @Input() products: any[] = [];  
   isLoading: boolean = true; 
 
   constructor(private apiService: ApiService) {}
 
   ngOnInit(): void {
     this.apiService.getAllProducts().subscribe(
       (data) => {
         console.log(data); 
         this.products = data;
         this.isLoading = false;
         console.log(data);
         
       }
     );
   }
}
