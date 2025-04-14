import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent implements OnInit {

  usersCount: number = 0;
  productsCount: number = 0;
  categoriesCount: number = 0;
  subcategoriesCount: number = 0;
  

  constructor(private rolesService: ApiService) {}

  ngOnInit(): void {
    this.rolesService.getUsersCount().subscribe({
      next: (data) => {
        this.usersCount = data;
        console.log('Users Count:', data);
      },
      error: (err) => {
        console.error('Error fetching user count:', err);
      }
    });

    this.rolesService.getProductsCount().subscribe({
      next: (data) => {
        this.productsCount = data;
        console.log('productsCount:', data);
      },
      error: (err) => {
        console.error('Error fetching user count:', err);
      }
    });

    this.rolesService.getsubCatagoriesCount().subscribe({
      next: (data) => {
        this.subcategoriesCount = data;
        console.log('subcategoriesCount:', data);
      },
      error: (err) => {
        console.error('Error fetching user count:', err);
      }
    });
    
    this.rolesService.getCategoriesCount().subscribe({
      next: (data) => {
        this.categoriesCount = data;
        console.log('categoriesCount:', data);
      },
      error: (err) => {
        console.error('Error fetching user count:', err);
      }
    });
  }
}
