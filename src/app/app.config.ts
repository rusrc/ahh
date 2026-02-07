import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { authMockInterceptor } from './core/auth/auth.interceptor';
import { dataMockInterceptor } from './core/data/mock-data.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authMockInterceptor, dataMockInterceptor])),
    provideClientHydration(withEventReplay()),
  ],
};
