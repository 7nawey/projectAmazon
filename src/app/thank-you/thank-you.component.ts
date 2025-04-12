import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-thank-you',
  imports: [CommonModule],
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