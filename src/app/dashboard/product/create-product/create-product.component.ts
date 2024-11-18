import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  userId: string = 'ebf92ca9-5cfc-47d3-85eb-c2a5045c1cb5'; // Puedes obtener esto dinámicamente según la sesión del usuario
  product = {
    name: '',
    price: 0,
    imageUrl: '',
    description: '',
    category: '',
  };

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  onSubmit(event: Event): void {
    event.preventDefault();

    const productPayload = {
      userId: this.userId,
      product: this.product,
    };

    this.productService.createProduct(productPayload).subscribe({
      next: (response) => {
        console.log('Producto creado con éxito', response);
        // Navega o muestra un mensaje
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        console.error('Error al crear el producto', err);
      },
    });
  }
}
