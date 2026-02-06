import { Routes } from '@angular/router';
import { Layout } from './layout';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        // loadComponent: () =>
        //   import('../dashboard/dashboard.component').then(
        //     (m) => m.DashboardComponent
        //   ),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
