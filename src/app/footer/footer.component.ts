import { Component } from '@angular/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-footer',
  imports: [LanguageSwitcherComponent,TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  
}
