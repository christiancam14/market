import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtener el token JWT de localStorage o sessionStorage
  const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');

  // Si existe el token, clonamos la solicitud y añadimos el encabezado de autorización
  const authReq = token 
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) 
    : req;

  // Pasamos la solicitud al siguiente manejador
  return next(authReq);
};
