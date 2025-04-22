import { Component } from '@angular/core';
import { TranslateService,TranslateModule  } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./settings.component.css']
})
export class LanguageSwitcherComponent implements OnInit {
  selectedLang!: string;

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    // Retrieve saved language from localStorage (default to English)
    const savedLang = localStorage.getItem('appLang') || 'en';
    this.selectedLang = savedLang;
  }

  // Update selected language
  selectLang(lang: string) {
    this.selectedLang = lang;
  }

  // Save selected language and direction to localStorage and apply changes globally
  saveLang() {
    this.translate.use(this.selectedLang);  // Use selected language
    document.documentElement.dir = this.selectedLang === 'ar' ? 'rtl' : 'ltr';  // Update page direction
    localStorage.setItem('appLang', this.selectedLang);  // Save selected language
    localStorage.setItem('appDir', this.selectedLang === 'ar' ? 'rtl' : 'ltr');  // Save direction
    alert(this.translate.instant('LANGUAGE_SETTINGS.SAVED'));  // Notify user that settings are saved
  }
}
