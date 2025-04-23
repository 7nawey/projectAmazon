import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sub-grocery',
  imports: [RouterLink,TranslateModule],
  templateUrl: './sub-grocery.component.html',
  styleUrl: './sub-grocery.component.css'
})
export class SubGroceryComponent {

}
