import { Component, inject } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { HttpClient } from '@angular/common/http';
import { SliderComponent } from '../slider/slider.component';
import { FashoinComponent } from '../fashoin/fashoin.component';

@Component({
  selector: 'app-home',
  imports: [ProductsComponent,SliderComponent,FashoinComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
