/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, provideHttpClient as provideHttp } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { appConfig } from './app/app.config'; 

import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Adjust this based on your project structure

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
const savedLang = localStorage.getItem('appLang') || 'en';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers, 
    provideHttp(),
    provideRouter(routes),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: localStorage.getItem('appLang') || 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        }
      })
    )
  ]
}).catch(err => console.error(err));
