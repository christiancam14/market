import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LayoutComponent } from '../shared/ui/layout/layout.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageDetailComponent } from './messages/message-detail/message-detail.component';

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
        children: [
          {
            path: ':id',
            loadComponent: () => MessageDetailComponent, // Muestra detalles del mensaje
          },
        ],
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
] as Routes;
