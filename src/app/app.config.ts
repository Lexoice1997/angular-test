import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { APIInterceptor } from './core/intercepters/api.intercepter';
import { AuthInterceptor } from './core/intercepters/auth.intercepter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([APIInterceptor, AuthInterceptor])),
  ],
};
