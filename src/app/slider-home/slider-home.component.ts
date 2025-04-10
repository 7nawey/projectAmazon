import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-slider-home',
  imports: [CommonModule,RouterLink],
  templateUrl: './slider-home.component.html',
  styleUrl: './slider-home.component.css'
})
export class SliderHomeComponent {
  @Input() products: any[] = []; 
         isLoading: boolean = true; 
         constructor(private apiService: ApiService , private router: Router) {}
           
             ngOnInit(): void {
               this.apiService.getFashoincategory().subscribe(
                 (data) => {
                   console.log(data); 
                   this.products = data;
                   this.isLoading = false;
                   console.log(data);
                   
                 }
                 
               );
             }

}
