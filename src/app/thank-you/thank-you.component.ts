import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-thank-you',
  imports: [CommonModule,LanguageSwitcherComponent,TranslateModule],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css'
})
export class ThankYouComponent implements OnInit {
  orderId: number | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedOrderId = localStorage.getItem('orderId');
    this.orderId = storedOrderId ? +storedOrderId : null;
  }

  goHome() {
    this.router.navigate(['/']);
  }
}