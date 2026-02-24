import { Routes } from '@angular/router';
import { Layout } from './layout';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'machines',
        data: { title: 'Telares', icon: 'precision_manufacturing' },
        loadComponent: () =>
          import('../features/machines/machines').then(
            (m) => m.Machines
          ),
      },
      {
        path: 'daily-production',
        data: { title: 'Producción Diaria', icon: 'trolley' },
        loadComponent: () =>
          import('../features/daily-production/daily-production').then(
            (m) => m.DailyProduction
          ),
      },
      {
        path: 'metrics',
        data: { title: 'Métricas', icon: 'bar_chart' },
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
