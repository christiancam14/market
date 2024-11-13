import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environmets';
import { map } from 'rxjs';
import { User } from '../../core/interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.endpoint}/api`;
  constructor(private http: HttpClient) {}

  getUserById(id: string) {
    return this.http
      .get(`${this.baseUrl}/users/${id}`)
      .pipe(map((res) => res as User));
  }
}
