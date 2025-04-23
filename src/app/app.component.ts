import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,FooterComponent,AdmindashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'amazon';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    // Retrieve saved language from localStorage (default to English if nothing saved)
    const savedLang = localStorage.getItem('appLang') || 'en';
    this.translate.use(savedLang);  // Set the selected language globally
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';  // Update direction based on language
  }
  
}
