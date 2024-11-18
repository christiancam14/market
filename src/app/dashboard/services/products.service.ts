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
    return this.http
      .get(`${this.baseUrl}/products/${id}`)
      .pipe(map((res) => res as Product));
  }

  getProductByUserId(id: string): Observable<Product[]> {
    return this.http
      .get(`${this.baseUrl}/products/user/${id}`)
      .pipe(map((res) => res as Product[]));
  }

  createProduct(payload: { userId: string; product: any }): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, payload);
  }

  likeProduct(userId: string, productId: string) {
    console.log('Llega');
    const url = `${this.baseUrl}/products/${productId}/likes`;
    const formData = new FormData();
    formData.append('userId', userId);
    return this.http.post(url, formData);
  }

  addComment(
    productId: string,
    userId: string,
    commentText: string
  ): Observable<any> {
    const url = `${this.baseUrl}/products/${productId}/comments`;

    const body = {
      userId,
      commentText,
    };

    return this.http.post(url, body);
  }
}
