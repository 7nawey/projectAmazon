import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-sub-home',
  imports: [RouterLink,TranslateModule],
  templateUrl: './sub-home.component.html',
  styleUrl: './sub-home.component.css'
})
export class SubHomeComponent {

}
