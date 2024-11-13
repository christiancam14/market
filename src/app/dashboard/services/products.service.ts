import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environmets';
import { map, Observable } from 'rxjs';
import { Product } from '../../core/interfaces/Products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = `${environment.endpoint}/api`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get(`${this.baseUrl}/products`)
      .pipe(map((res) => res as Product[]));
  }

  getProductById(id: string): Observable<Product> {
    console.log(id);
    return this.http
      .get(`${this.baseUrl}/products/${id}`)
      .pipe(map((res) => res as Product));
  }
}
