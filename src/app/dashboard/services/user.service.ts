import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environmets';
import { map, Observable } from 'rxjs';
import { User } from '../../core/interfaces/User';
import { Contact } from '../../core/interfaces/Messages';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.endpoint}/api`;
  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<User> {
    return this.http
      .get(`${this.baseUrl}/users/${id}`)
      .pipe(map((res) => res as User));
  }

  // Actualizar perfil de usuario
  updateUser(userId: string, user: User): Observable<User> {
    // Crear un FormData para enviar los datos
    const body = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      cedula: user.cedula,
      address: user.address,
      role: user.role,
    };

    // Realizamos la solicitud PUT a la URL del endpoint con el FormData
    return this.http.patch<User>(`${this.baseUrl}/users/${userId}/update`, body);
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.baseUrl}/users/all?role=USER`);
  }

  getMyContacts(userId: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.baseUrl}/contacts/${userId}`).pipe(
      map((response: any[]) => response.map((contact) => contact.contactUser)) // Mapea solo los contactos
    );
  }
}
