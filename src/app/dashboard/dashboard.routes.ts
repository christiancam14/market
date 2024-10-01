import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LayoutComponent } from '../shared/ui/layout/layout.component';

export default [
  {
    path: '',
    loadComponent: () => LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => DashboardComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
] as Routes;
