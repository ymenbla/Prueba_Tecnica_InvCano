import { Routes } from '@angular/router';
import { authGuard, guestGuard } from '@auth/index';

export const routes: Routes = [
  {
    path: 'auth',
    // canActivate: [guestGuard],
    loadChildren: () =>
      import('./auth/auth.routes').then(r => r.AUTH_ROUTES)
  },
  {
    path: 'app',
    // canActivate: [authGuard],
    loadChildren: () =>
      import('./layout/layout.routes').then(r => r.LAYOUT_ROUTES)
  },
  { path: '**', redirectTo: 'auth' }
];
