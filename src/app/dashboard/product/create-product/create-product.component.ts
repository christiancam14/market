import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  userId: string = 'ebf92ca9-5cfc-47d3-85eb-c2a5045c1cb5'; // Puedes obtener esto dinámicamente según la sesión del usuario
  productForm: FormGroup;
  product = {
    name: '',
    price: 0,
    imageUrl: '',
    description: '',
    category: '',
  };

  constructor(
    private productService: ProductsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.minLength(2)]],
      imageUrl: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    // Extraer los valores de los controles del formulario
    const productPayload = {
      userId: this.userId,
      product: { ...this.productForm.value }, // Usar el valor, no la instancia del FormGroup
    };

    this.productService.createProduct(productPayload).subscribe({
      next: (response) => {
        console.log('Producto creado con éxito', response);
        // Navega o muestra un mensaje
        this.router.navigate(['/perfil']);
      },
      error: (err) => {
        console.error('Error al crear el producto', err);
      },
    });
  }
}
