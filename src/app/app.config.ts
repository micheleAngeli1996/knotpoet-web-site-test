import {HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideRouter, withInMemoryScrolling, withViewTransitions} from '@angular/router';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';

import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {provideFunctions, getFunctions} from '@angular/fire/functions';

import {routes} from './app.routes';
import {environment} from '../environments/environment.prod';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) => new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })),
    importProvidersFrom([TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: navigator.language?.includes('-') ? (navigator.language || 'en-EN') : 'en-EN'
    })]),
    provideFirebaseApp(() => initializeApp(environment.FIREBASE_CONFIG)),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
  ]
};
