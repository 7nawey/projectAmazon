import { Component } from '@angular/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

  @Component({
  selector: 'app-settings',
  imports: [CommonModule,LanguageSwitcherComponent,TranslateModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  constructor(private translate: TranslateService) {}


switchLang(lang: string) {
    this.translate.use(lang);                         
    localStorage.setItem('appLang', lang);           
  
  }

}
