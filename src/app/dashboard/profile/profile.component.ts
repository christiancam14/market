import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../core/interfaces/User';
import { ProductsService } from '../services/products.service';
import { Product } from '../../core/interfaces/Products';
import { ProductCardComponent } from '../../shared/ui/product-card/product-card.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  isLoading: boolean = true; // Indicar si está en carga
  errorMessage: string | null = null; // Para manejar errores
  imgUrl: string = '';
  userId: string = '';
  user: User | null = null;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Decodificar el JWT para obtener el ID
      const decoded: any = jwtDecode(token);
      this.userId = decoded.sub;
      this.loadUserProfile();
      this.loadProducts();
    }
  }

  loadProducts() {
    try {
      this.productsService
        .getProductByUserId(this.userId)
        .subscribe(async (products) => {
          this.products = products;
        });
    } catch (error) {
      console.log(error);
    }
  }

  loadUserProfile() {
    // Llamar al servicio para obtener el perfil usando el ID del usuario
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.user = data;
      this.imgUrl = `https://placehold.co/400x400/EEE/31343C?font=montserrat&text=${this.user.username}`;
      this.isLoading = false;
    });
  }

  onEditProfile() {
    // Lógica para navegar a la página de edición
    this.router.navigate(['/editar-perfil', this.user?.id]);
  }

  onCreateProduct() {
    this.router.navigate(['/crear-producto']);
  }
}
