import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app-routing.module';
import { authInterceptor } from './app/auth/auth.interceptor';
import { AuthService } from './app/auth/auth.service';

import { provideOAuthClient } from 'angular-oauth2-oidc';

export function initAuth(auth: AuthService) {
  return () => auth.initLoginFlow();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),

    // 👉 alles Nötige aus angular-oauth2-oidc
    provideOAuthClient({
      resourceServer: {
        allowedUrls: ['http://localhost:8080/library/ui'], // deine API-Endpoints
        sendAccessToken: true
      }
    }),

    // 👉 Initialisierung beim App-Start
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [AuthService],
      multi: true
    }
  ]
};

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
