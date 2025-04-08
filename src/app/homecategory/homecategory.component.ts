import { Component } from '@angular/core';
import { SubHomeComponent } from '../sub-home/sub-home.component';
import { KitchenComponent } from '../kitchen/kitchen.component';

@Component({
  selector: 'app-homecategory',
  imports: [SubHomeComponent,KitchenComponent],
  templateUrl: './homecategory.component.html',
  styleUrl: './homecategory.component.css'
})
export class HomecategoryComponent {

}
