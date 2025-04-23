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
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tmImage from '@teachablemachine/image';
import * as mobilenet from '@tensorflow-models/mobilenet';
import nlp from 'compromise';
import '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule,TranslateModule],
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
  isListening = false;
  recognition: any;

  private tmModel: tmImage.CustomMobileNet | null = null;
  private maxPredictions = 0;
  private cocoModel: cocoSsd.ObjectDetection | null = null;
  private mobileNetModel: mobilenet.MobileNet | null = null;

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
    await tf.ready();

    const modelURL = 'assets/model.json';
    const metadataURL = 'assets/metadata.json';
    this.tmModel = await tmImage.load(modelURL, metadataURL);
    this.maxPredictions = this.tmModel.getTotalClasses();

    this.cocoModel = await cocoSsd.load();
    this.mobileNetModel = await mobilenet.load();

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
    if (this.selectedImage && this.selectedImagePreview) {
      const image = await this.loadImage(this.selectedImagePreview);
      const predictions: { label: string; probability: number }[] = [];

      const predictionPromises = [];

      if (this.cocoModel) {
        predictionPromises.push(
          this.cocoModel.detect(image).then(res => {
            if (res.length > 0) {
              predictions.push({ label: res[0].class, probability: res[0].score });
            }
          })
        );
      }

      if (this.tmModel) {
        predictionPromises.push(
          this.tmModel.predict(image).then(res => {
            const top = res.reduce((prev, curr) =>
              curr.probability > prev.probability ? curr : prev
            );
            predictions.push({ label: top.className, probability: top.probability });
          })
        );
      }

      if (this.mobileNetModel) {
        predictionPromises.push(
          this.mobileNetModel.classify(image).then(res => {
            if (res.length > 0) {
              predictions.push({ label: res[0].className, probability: res[0].probability });
            }
          })
        );
      }

      await Promise.all(predictionPromises);

      if (predictions.length > 0) {
        const best = predictions.reduce((prev, curr) =>
          curr.probability > prev.probability ? curr : prev
        );

        const doc = nlp(best.label);
        const cleanedLabel = doc.nouns().toSingular().out('text') || best.label;

        this.router.navigate(['/search'], { queryParams: { query: cleanedLabel } });
      }

      this.clearSearch();
    } else if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { query: this.searchTerm.trim() }
      });
      this.clearSearch();
    }
  }

  loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
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

    this.recognition.onerror = () => {
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
