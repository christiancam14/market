import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

export default [
  {
    path: '',
    loadComponent: () => AdminLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => AdminComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
] as Routes;
