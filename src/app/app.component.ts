import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { SliderComponent } from './slider/slider.component';
import { HttpClient } from '@angular/common/http';
import { GroceryComponent } from './grocery/grocery.component';
import { MeatsComponent } from './meats/meats.component';
import { FruitsComponent } from './fruits/fruits.component';
import { SubGroceryComponent } from './sub-grocery/sub-grocery.component';
import { CannedComponent } from './canned/canned.component';
import { DrinksComponent } from './drinks/drinks.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,HomeComponent,FooterComponent,ProductsComponent,CartComponent,SliderComponent,GroceryComponent,MeatsComponent,FruitsComponent,SubGroceryComponent,CannedComponent,DrinksComponent,ProductDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'amazon';
}
