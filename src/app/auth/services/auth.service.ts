import { Injectable } from '@angular/core';
import { UserRole } from '../../core/enums/user-role.enum';
import { environment } from '../../../environments/environmets';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LoginErrorResponse, LoginResponse } from '../../core/interfaces/Auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRole: UserRole = UserRole.Guest;

  private baseUrl = `${environment.endpoint}/api/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: {
    email: string;
    password: string;
  }): Observable<LoginResponse | LoginErrorResponse> {
    /*
    const resp = this.http.post<LoginResponse | LoginErrorResponse>(
      `${this.baseUrl}/login`,
      credentials
    );
    */

    return this.http
      .post(`${this.baseUrl}/login`, credentials)
      .pipe(map((res) => res as LoginResponse | LoginErrorResponse));

    // return resp;
  }

  isAuthenticated(): boolean {
    // return !!localStorage.getItem('token');
    return this.userRole !== UserRole.Guest;
  }

  isBaseUser(): boolean {
    return this.userRole === UserRole.User;
  }

  isAdmin(): boolean {
    return this.userRole === UserRole.Admin;
  }

  setUserRole(role: UserRole) {
    this.userRole = role;
  }

  getUserRole() {
    return this.userRole;
  }
}
