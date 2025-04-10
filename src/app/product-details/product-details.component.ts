import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
   standalone: true,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  isLoading: boolean = true;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const productID = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Product ID:', productID); 
    if (productID) {
      this.apiService.getProductById(productID).subscribe(
        (data) => {
          this.product = data;
          this.isLoading = false;
        }
      );
    }
    
  }
  changeMainImage(image: string): void {
    const mainImage = document.getElementById('mainImage') as HTMLImageElement;
    mainImage.src = image; 
  }
// products.component.ts
expandedDescriptions: Set<number> = new Set();

toggleDescription(productID: number): void {
  if (this.expandedDescriptions.has(productID)) {
    this.expandedDescriptions.delete(productID);
  } else {
    this.expandedDescriptions.add(productID);
  }
}


}
