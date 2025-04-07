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
];
