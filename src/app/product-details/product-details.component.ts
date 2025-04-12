import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  isLoading: boolean = true;

  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute,
    private cartService: CartService,  
    private router: Router  // إضافة Router هنا للتنقل
  ) {}

  ngOnInit(): void {
    const productID = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Product ID:', productID); 
    if (productID) {
      this.apiService.getProductById(productID).subscribe(
        (data) => {
          this.product = data;
          this.isLoading = false;
        },
        (error) => {
          console.error("Error fetching product details", error);
          this.isLoading = false;
        }
      );
    }
  }

  changeMainImage(image: string): void {
    const mainImage = document.getElementById('mainImage') as HTMLImageElement;
    if (mainImage) {
      mainImage.src = image;
    }
  }

  addToCart(): void {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      // إذا لم يكن هناك توكن، يتم نقل المستخدم إلى صفحة تسجيل الدخول
      this.router.navigate(['/login']);
      return;
    }
    if (this.product) {
      this.cartService.addToCart(this.product.productID).subscribe({
        next: () => {
          // بعد إضافة المنتج إلى السلة، سيتم نقل المستخدم إلى صفحة السلة
          this.router.navigate(['/cart']);
        },
        error: (err) => {
          alert('Failed to add product to cart.');
          console.error(err);
        }
      });
    }
  }

  expandedDescriptions: Set<number> = new Set();

  toggleDescription(productID: number): void {
    if (this.expandedDescriptions.has(productID)) {
      this.expandedDescriptions.delete(productID);
    } else {
      this.expandedDescriptions.add(productID);
    }
  }
}
