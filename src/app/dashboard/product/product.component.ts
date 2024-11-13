import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/interfaces/Products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  product: Product | null = null;  // Asegúrate de que sea null por defecto
  productId: string | null = null;
  isLoading: boolean = true;  // Indicar si está en carga
  errorMessage: string | null = null;  // Para manejar errores

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.loadProduct();  // Llamamos a la función para cargar el producto
    } else {
      this.router.navigate(['']);  // Redirigir si no hay un id
    }
  }

  loadProduct() {
    this.isLoading = true;  // Establecer estado de carga
    this.productService
      .getProductById(this.productId!)
      .subscribe({
        next: (product) => {
          this.product = product;
          this.isLoading = false;  // Cambio a no cargar
        },
        error: (error) => {
          this.isLoading = false;  // Cambio a no cargar
          this.errorMessage = 'No se pudo cargar el producto. Inténtalo de nuevo más tarde.';  // Mostrar mensaje de error
        },
      });
  }
}
