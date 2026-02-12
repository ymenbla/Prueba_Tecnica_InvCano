import { Routes } from '@angular/router';
import { Layout } from './layout';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'machines',
        loadComponent: () =>
          import('../features/machines/machines').then(
            (m) => m.Machines
          ),
      },
      {
        path: 'daily-production',
        loadComponent: () =>
          import('../features/daily-production/daily-production').then(
            (m) => m.DailyProduction
          ),
      },
      {
        path: 'metrics',
        loadComponent: () =>
          import('../features/metrics/metrics').then(
            (m) => m.Metrics
          ),
      },
      {
        path: '',
        redirectTo: 'machines',
        pathMatch: 'full',
      },
    ],
  },
];
