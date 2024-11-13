// Respuesta exitosa
export interface LoginResponse {
    ok: true;
    nombre: string;
    token: string;
  }
  
  // Respuesta de error
  export interface LoginErrorResponse {
    ok: false;
    msg: string;
  }
  