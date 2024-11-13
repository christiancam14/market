import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LayoutComponent } from '../shared/ui/layout/layout.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageDetailComponent } from './messages/message-detail/message-detail.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';

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
        path: 'product/:id',
        loadComponent: () => ProductComponent,
      },
      {
        path: 'perfil',
        loadComponent: () => ProfileComponent,
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
