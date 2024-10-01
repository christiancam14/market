import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);

  const authService = inject(AuthService);

  const isAuthenticated = authService.isAuthenticated();
  const isBaseUser = authService.isBaseUser();
  const isAdmin = authService.isAdmin();

  if (!isAuthenticated) return true;

  if (isAdmin) {
    router.navigate(['/admin']);
    return false;
  }

  if (isBaseUser) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
