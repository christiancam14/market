const servicios = 'localhost';
const protocolo = 'http';
const puerto = '8080';

export const environment = {
  production: false,
  url: `${protocolo}://${servicios}`,
  endpoint: `${protocolo}://${servicios}:${puerto}`,
};
