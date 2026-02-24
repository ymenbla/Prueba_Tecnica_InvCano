import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { credentialsInterceptor } from '@core/interceptors/credentials-interceptor';
import { refreshInterceptor } from '@core/interceptors/refresh-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([credentialsInterceptor, refreshInterceptor])
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
