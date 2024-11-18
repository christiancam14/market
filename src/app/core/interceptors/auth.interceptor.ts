import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  console.log('Test')

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.error?.ok === false &&
        error.error?.msg === 'No autenticado'
      ) {
        // Limpiamos localStorage y sessionStorage
        localStorage.clear();
        sessionStorage.clear();
        // Redirigimos al login
        router.navigate(['/login']);
      }

      // Propagamos el error para que el cliente pueda manejarlo si es necesario
      return throwError(() => error);
    })
  );

  return next(req);
};
