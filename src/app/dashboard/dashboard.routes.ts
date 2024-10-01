import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LayoutComponent } from '../shared/ui/layout/layout.component';
import { MessagesComponent } from './messages/messages.component';

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
        path: 'messages',
        loadComponent: () => MessagesComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
] as Routes;
