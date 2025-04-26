import { Component, inject, Input } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { Router, RouterModule } from '@angular/router';
import { SliderComponent } from '../slider/slider.component';
import { FashoinComponent } from '../fashoin/fashoin.component';
import { ApiService } from '../api.service';
import { SliderHomeComponent } from '../slider-home/slider-home.component';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [ProductsComponent,SliderHomeComponent,RouterModule,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
@Input() products: any[] = []; 
       isLoading: boolean = true; 
       constructor(private apiService: ApiService , private router: Router) {}
         
           ngOnInit(): void {
             this.apiService.getPerfume().subscribe(
               (data) => {
                 this.products = data;
                 this.isLoading = false;   
               } 
             );
           }
}
