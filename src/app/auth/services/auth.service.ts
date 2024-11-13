import { Injectable } from '@angular/core';
import { UserRole } from '../../core/enums/user-role.enum';
import { environment } from '../../../environments/environmets';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  LoginRegisterErrorResponse,
  LoginRegisterResponse,
} from '../../core/interfaces/Auth';
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
  }): Observable<LoginRegisterErrorResponse | LoginRegisterResponse> {
    return this.http
      .post(`${this.baseUrl}/login`, credentials)
      .pipe(
        map((res) => res as LoginRegisterErrorResponse | LoginRegisterResponse)
      );
  }

  register(credentials: {
    email: string;
    password: string;
  }): Observable<LoginRegisterErrorResponse | LoginRegisterResponse> {
    return this.http
      .post(`${this.baseUrl}/login`, credentials)
      .pipe(
        map((res) => res as LoginRegisterErrorResponse | LoginRegisterResponse)
      );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  isBaseUser(): boolean {
    const userRole = localStorage.getItem('userRole'); 
    return userRole === UserRole.User;
  }

  isAdmin(): boolean {
    const userRole = localStorage.getItem('userRole'); 
    return userRole === UserRole.Admin;
  }

  setUserRole(role: UserRole) {
    this.userRole = role;
  }

  getUserRole() {
    return this.userRole;
  }
}
