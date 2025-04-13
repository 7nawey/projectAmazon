import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from '../products/products.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink,ProductsComponent,FormsModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,private router: Router,private apiService: ApiService) {}

  ngOnInit(): void {
  
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  logout(): void {
    console.log('Logout clicked');
  localStorage.removeItem('token');
  localStorage.removeItem('application_user_id');
  this.router.navigate(['/login']);
    this.authService.logout(); 
  }
  searchTerm = '';

onSearch() {
  if (this.searchTerm.trim()) {
    this.router.navigate(['/search'], {
      queryParams: { query: this.searchTerm }
    });
  }
}
}
