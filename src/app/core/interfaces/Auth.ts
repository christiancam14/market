// Respuesta exitosa
export interface LoginRegisterResponse {
  ok: true;
  nombre: string;
  token: string;
  role: 'USER' | 'ADMIN';
}

// Respuesta de error
export interface LoginRegisterErrorResponse {
  ok: false;
  msg: string;
}
