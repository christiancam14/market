import { Injectable } from '@angular/core';
import { UserRole } from '../../core/enums/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRole: UserRole = UserRole.Guest;

  constructor() {}

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
