import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'app',
    // canActivate: [authGuard],
    loadChildren: () =>
      import('./layout/layout.routes').then(r => r.LAYOUT_ROUTES)
  },
  { path: '**', redirectTo: 'auth' }
];
