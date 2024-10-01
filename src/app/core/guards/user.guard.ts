import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);

  const authService = inject(AuthService);

  const isAuthenticated = authService.isAuthenticated();
  const isBaseUser = authService.isBaseUser();
  const isAdmin = authService.isAdmin();

  if (!isAuthenticated) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (isBaseUser) {
    return true;
  }

  if (isAdmin) {
    router.navigate(['/admin']);
    return false;
  }

  router.navigate(['/auth/login']);
  return false;
};
