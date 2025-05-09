import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ReviewService } from '../services/review.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service'; // ✅ إضافة AuthService
import { ProductsComponent } from '../products/products.component';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule,TranslateModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  animations: []
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  isLoading: boolean = true;
  reviews: any[] = [];
  rating: number = 5;
  reviewText: string = '';
  expandedDescriptions: Set<number> = new Set();
  discountPercentage: number = 0;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private reviewService: ReviewService,
    private router: Router,
    private authService: AuthService ,
  ) {}

  ngOnInit(): void {
    const productID = Number(this.route.snapshot.paramMap.get('id'));
    if (productID) {
      this.loadProduct(productID);
      this.loadReviews(productID);
      
    }
  }

  loadProduct(productID: number): void {
    this.apiService.getProductById(productID).subscribe({
      next: (data) => {
        this.product = data;
        this.isLoading = false; 
        // ✅ Calculate percentage discount
        if (this.product.price && this.product.priceAfterDiscount < this.product.price) {
          const discount = ((this.product.price - this.product.priceAfterDiscount) / this.product.price) * 100;
          this.discountPercentage = Math.round(discount * 10) / 10; // e.g., 10.5%
        } else {
          this.discountPercentage = 0;
        }
      },
      error: (error) => {
        console.error("Error fetching product details", error);
        this.isLoading = false;
      }
    });
  }

  loadReviews(productID: number): void {
    this.reviewService.getReviewsByProduct(productID).subscribe({
      next: (data: any[]) => {
        this.reviews = data;
      },
      error: (err: any) => {
        console.error("Error loading reviews", err);
      }
    });
  }

  submitReview(): void {
    const userId = this.authService.getApplicationUserId(); // ✅ بدل localStorage
    if (!userId || !this.product) {
      Swal.fire({
        title: 'Error',
        text: 'You must be logged in to submit a review.',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false
      });
      this.router.navigate(['/login']);
      return;
    }

    const reviewData = {
      rating: this.rating,
      reviewText: this.reviewText,
      reviewDate: new Date().toISOString(),
      productID: this.product.productID,
      applicationUserId: userId
    };

    this.reviewService.addReview(userId, this.product.productID, reviewData).subscribe({
      next: () => {
        this.rating = 5;
        this.reviewText = '';
        setTimeout(() => this.loadReviews(this.product.productID), 300);
        Swal.fire({
          title: 'Success',
          text: 'Your review has been submitted.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: true
        });
      },
      error: (err: any) => {
        console.error("Error submitting review", err);
        if (err.status === 200) {
          this.rating = 5;
          this.reviewText = '';
          setTimeout(() => this.loadReviews(this.product.productID), 300);
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Failed to submit review.',
            icon: 'error',
            timer: 2000,
            showConfirmButton: true
          });
        }
      }
    });
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
      this.router.navigate(['/login']);
      return;
    }

    if (this.product) {
      this.cartService.addToCart(this.product.productID).subscribe({
        next: () => {
          this.router.navigate(['/cart']);
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'Failed to add product to cart.',
            icon: 'error',
            timer: 2000,
            showConfirmButton: false
          });
          console.error(err);
        }
      });
    }
  }

  toggleDescription(productID: number): void {
    if (this.expandedDescriptions.has(productID)) {
      this.expandedDescriptions.delete(productID);
    } else {
      this.expandedDescriptions.add(productID);
    }
  }
  getRemainingDays(): number | null {
    if (this.product?.deal?.endDate) {
      const end = new Date(this.product.deal.endDate);
      const now = new Date();
      const diff = end.getTime() - now.getTime();
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
    return null;
  }  
  
  
}
