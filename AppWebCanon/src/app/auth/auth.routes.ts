import { Routes } from '@angular/router';
import { AuthLayout } from '@auth/index';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(p => p.Login),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then(p => p.Register),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];
