
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent  {
  @Input() products: any[] = [];  
   isLoading: boolean = true; 
 
   constructor(private apiService: ApiService , private wishlistService:WishlistService) {}

   
  }
  


