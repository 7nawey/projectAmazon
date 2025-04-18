import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../services/wishlist.service';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-webgl';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  cartItemCount = 0;
  cart$: Observable<any>;
  isAdmin = false;
  searchTerm = '';
  userRole: string | null = null;
  selectedImage: File | null = null;
  selectedImagePreview: string | null = null;
  private model: mobilenet.MobileNet | null = null;
  isListening = false;
  recognition: any;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private apiService: ApiService,
    private wishlistService: WishlistService
  ) {
    this.cart$ = this.cartService.cart$;
  }

  async ngOnInit(): Promise<void> {
    await tf.setBackend('webgl');
    await tf.ready();
    this.model = await mobilenet.load();

    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.cartService.updateCart();
        this.setUserRole();
      } else {
        this.cartItemCount = 0;
        this.userRole = null;
        this.isAdmin = false;
      }
    });

    this.cart$.subscribe(cart => {
      this.cartItemCount = cart?.items?.length || 0;
    });
  }

  logout(): void {
    this.authService.logout();
    this.cartItemCount = 0;
    this.isAdmin = false;
  }

  async onSearch() {
    if (this.selectedImage && this.model) {
      const img = new Image();
      img.src = this.selectedImagePreview!;
      img.crossOrigin = 'anonymous';

      img.onload = async () => {
        const imageTensor = tf.browser.fromPixels(img).resizeNearestNeighbor([224, 224]);
        const tensor3D = imageTensor.expandDims(0);
        const predictions = await this.model!.classify(tensor3D as tf.Tensor3D);
        if (predictions.length > 0) {
          const label = predictions[0].className;
          this.router.navigate(['/search'], { queryParams: { query: label } });
        }
        this.clearSearch();
      };
    } else if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { query: this.searchTerm.trim() }
      });
      this.clearSearch();
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.selectedImage = null;
    this.selectedImagePreview = null;
  }

  setUserRole(): void {
    const roles = this.authService.getUserRoles();
    this.userRole = roles.length > 0 ? roles[0] : null;
    this.isAdmin = roles.includes('Admin');
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  clearImageSelection() {
    this.selectedImage = null;
    this.selectedImagePreview = null;
  }

  startVoiceInput() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice recognition not supported on this browser');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = true;
    this.recognition.continuous = true;

    this.isListening = true;

    this.recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      this.searchTerm = transcript;
    };

    this.recognition.onerror = (event: any) => {
      this.stopVoiceInput();
    };

    this.recognition.start();
  }

  stopVoiceInput() {
    if (this.recognition) {
      this.recognition.stop();
      this.recognition = null;
    }
    this.isListening = false;
  }
}
