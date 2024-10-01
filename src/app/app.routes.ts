import { Routes } from '@angular/router';
import { userGuard } from './core/guards/user.guard';
import { adminGuard } from './core/guards/admin.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  // rutas publicas
  {
    path: 'auth',
    canActivate: [
      // guestGuard
    ],
    loadChildren: () => import('./auth/auth.routes'),
  },
  // rutas privadas
  {
    path: 'admin',
    canActivate: [
      // adminGuard
    ],
    loadChildren: () => import('./admin/admin.routes'),
  },
  {
    path: '',
    canActivate: [
      // userGuard
    ],
    loadChildren: () => import('./dashboard/dashboard.routes'),
  },
];
