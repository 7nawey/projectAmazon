import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sub-fashoin',
  imports: [RouterLink,TranslateModule],
  templateUrl: './sub-fashoin.component.html',
  styleUrl: './sub-fashoin.component.css'
})
export class SubFashoinComponent {

}
