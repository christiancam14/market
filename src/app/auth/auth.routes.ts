import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

export default [
  {
    path: '',
    loadComponent: () => AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => LoginComponent,
      },
      {
        path: 'register',
        loadComponent: () => RegisterComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
] as Routes;
