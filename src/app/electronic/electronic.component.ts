import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SubElectronicComponent } from '../sub-electronic/sub-electronic.component';
import { ApiService } from '../api.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-electronic',
  imports: [RouterOutlet,CommonModule,SubElectronicComponent,ProductsComponent],
  templateUrl: './electronic.component.html',
  styleUrl: './electronic.component.css'
})
export class ElectronicComponent{
  @Input() products: any[] = []; 
         isLoading: boolean = true; 
         constructor(private apiService: ApiService) {}
           
             ngOnInit(): void {
               this.apiService.getLaptop().subscribe(
                 (data) => {
                   console.log(data); 
                   this.products = data;
                   this.isLoading = false;
                   console.log(data);
                   
                 }
                 
               );
             }
}
