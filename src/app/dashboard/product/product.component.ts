import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/interfaces/Products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  product: Product = {
    id: '',
    name: '',
    imageUrl: '',
    category: '',
    price: 0,
    status: '',
    comments: [],
    likes: [],
  }; // Asegúrate de que sea null por defecto
  productId: string | null = null;
  isLoading: boolean = true; // Indicar si está en carga
  errorMessage: string | null = null; // Para manejar errores
  userId: string = '';
  newComment: string = '';

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.loadProduct(); // Llamamos a la función para cargar el producto
    } else {
      this.router.navigate(['']); // Redirigir si no hay un id
    }
  }

  loadProduct() {
    this.isLoading = true; // Establecer estado de carga
    this.productService.getProductById(this.productId!).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false; // Cambio a no cargar
      },
      error: (error) => {
        this.isLoading = false; // Cambio a no cargar
        this.errorMessage =
          'No se pudo cargar el producto. Inténtalo de nuevo más tarde.'; // Mostrar mensaje de error
      },
    });
  }

  onClickLike() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userId = decoded.sub;
      console.log(this.userId);
    }
    this.productService.likeProduct(this.userId, this.productId!).subscribe({
      next: (response) => {
        console.log('Me gusta enviado con éxito:', response);
        this.loadProduct();
        // Actualizar la UI o manejar el éxito.
      },
      error: (error) => {
        console.error('Error al dar me gusta:', error);
        // Manejar el error.
      },
    });
  }

  addComment() {
    if (this.newComment.trim()) {
      this.productService
        .addComment(this.productId!, this.userId, this.newComment)
        .subscribe({
          next: () => {
            // Agregar el comentario localmente para mostrarlo sin recargar
            this.loadProduct();
            this.newComment = '';
          },
          error: (err) => {
            console.error('Error al agregar el comentario:', err);
            this.errorMessage = 'No se pudo agregar el comentario.';
          },
        });
    }
  }
}
