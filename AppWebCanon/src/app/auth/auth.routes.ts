import { Routes } from '@angular/router';
import { AuthLayout } from './index';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login/login').then(m => m.Login),
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register').then(m => m.Register),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];
