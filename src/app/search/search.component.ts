import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [ProductsComponent,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  products: any[] = [];
  notFound = false;


  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const term = params['query'];
      if (term) {
        this.apiService.getProductByName(term).subscribe({
          next: res => {
            this.products = Array.isArray(res) ? res : [res];
            this.notFound = this.products.length === 0;
          },
          error: () => {
            this.products = [];
            this.notFound = true;
          }
        });
      }
    });
  }
  
}
