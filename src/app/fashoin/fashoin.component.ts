import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from '../api.service';
import { ProductsComponent } from '../products/products.component';
import { SubFashoinComponent } from '../sub-fashoin/sub-fashoin.component';
declare var bootstrap: any;
@Component({
  selector: 'app-fashoin',
  imports: [RouterOutlet,CommonModule , RouterModule,ProductsComponent,SubFashoinComponent],
  templateUrl: './fashoin.component.html',
  styleUrl: './fashoin.component.css'
})
export class FashoinComponent implements OnInit {
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
