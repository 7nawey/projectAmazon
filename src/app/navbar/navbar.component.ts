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
import { jwtDecode } from 'jwt-decode';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-webgl';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink,FormsModule,CommonModule],

  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  cartItemCount: number = 0;
  cart$: Observable<any>;
  isAdmin: boolean = false;
  searchTerm = '';
  userRole: string | null = null;

  selectedImage: File | null = null;
  selectedImagePreview: string | null = null;

  private model: mobilenet.MobileNet | null = null;

  isListening: boolean = false;
  recognition: any;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private apiService: ApiService,
    private wishlistService:WishlistService
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
        this.decodeUserRole();
      } else {
        this.cartItemCount = 0;
        this.userRole = null;
      }
    });
    
    
    const role = localStorage.getItem('role');
    console.log('Role from localStorage:', role); // تأكد من القراءة الصحيحة
    this.isAdmin = role === 'Admin'; 

    this.cart$.subscribe(cart => {
      this.cartItemCount = cart ? cart.items.length : 0;
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
          console.log('🔍 Image label:', label);
          this.router.navigate(['/search'], { queryParams: { query: label } });
        } else {
          console.warn('❌ No predictions found.');
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

  decodeUserRole(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userRole = decoded['role'] || null;
    }
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
      console.error('Speech recognition error:', event.error);
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



