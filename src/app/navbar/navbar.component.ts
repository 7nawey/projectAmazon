import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,private router: Router) {}

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
  
}
