import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { ElectronicComponent } from './electronic/electronic.component';
import { FashoinComponent } from './fashoin/fashoin.component';
import { GroceryComponent } from './grocery/grocery.component';
import { MeatsComponent } from './meats/meats.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FruitsComponent } from './fruits/fruits.component';
import { SubGroceryComponent } from './sub-grocery/sub-grocery.component';
import { CannedComponent } from './canned/canned.component';
import { DrinksComponent } from './drinks/drinks.component';
import { MenComponent } from './men/men.component';
import { WomenComponent } from './women/women.component';
import { ChildrenComponent } from './children/children.component';
import { HomecategoryComponent } from './homecategory/homecategory.component';
import { SubHomeComponent } from './sub-home/sub-home.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { BedComponent } from './bed/bed.component';
import { LivingComponent } from './living/living.component';
import { SubElectronicComponent } from './sub-electronic/sub-electronic.component';
import { LaptopComponent } from './laptop/laptop.component';
import { PhonesComponent } from './phones/phones.component';
import { BeautyComponent } from './beauty/beauty.component';
import { SubBeautyComponent } from './sub-beauty/sub-beauty.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SkincareComponent } from './skincare/skincare.component';
import { MakeupComponent } from './makeup/makeup.component';
import { PerfumeComponent } from './perfume/perfume.component';
import { JewelryComponent } from './jewelry/jewelry.component';
import { BodycareComponent } from './bodycare/bodycare.component';
import { SliderHomeComponent } from './slider-home/slider-home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ShippingComponent } from './shipping/shipping.component';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent,
    }, 
       {
        path:"cart",
        component:CartComponent,
    },
    {
        path:"products",
        component:ProductsComponent,
    },
    {
        path:"electronic",
        component:ElectronicComponent,
    }
    ,
    {
        path:"fashoin",
        component:FashoinComponent,
    },
    {
        path:"grocery",
        component:GroceryComponent,
    },
    {
        path:"meats",
        component:MeatsComponent,
    },
    { path: 'product-details/:id', component: ProductDetailsComponent },
    { path: 'fruits', component: FruitsComponent },
    { path: 'sub-grocery', component: SubGroceryComponent },
    { path: 'canned', component: CannedComponent },
    { path: 'drinks', component: DrinksComponent },
    { path: 'men', component: MenComponent },
    { path: 'women', component: WomenComponent },
    { path: 'children', component: ChildrenComponent },
    { path: 'homecategory', component: HomecategoryComponent },
    { path: 'subhome', component: SubHomeComponent },
    { path: 'kitchen', component: KitchenComponent },
    { path: 'bed', component: BedComponent },
    { path: 'living', component: LivingComponent },
    { path: 'subelectronic', component: SubElectronicComponent },
    { path: 'laptop', component: LaptopComponent },
    { path: 'phones', component: PhonesComponent },
    { path: 'beauty', component: BeautyComponent },
    { path: 'subbeauty', component: SubBeautyComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'skincare', component: SkincareComponent},
    { path: 'makeup', component: MakeupComponent},
    { path: 'perfume', component: PerfumeComponent},
    { path: 'jewelry', component: JewelryComponent},
    { path: 'bodycare', component: BodycareComponent},
    { path: 'sliderhome', component: SliderHomeComponent},
    { path: 'wishlist', component: WishlistComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'thank-you', component: ThankYouComponent},
    {path: 'shipping', component: ShippingComponent},  
    
];
