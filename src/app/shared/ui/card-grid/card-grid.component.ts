import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';
import { ProductsService } from '../../../dashboard/services/products.service';
import { Product } from '../../../core/interfaces/Products';

@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.css',
})
export class CardGridComponent {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {
    this.loadProducts();
  }

  private loadProducts() {
    try {
      this.productsService.getProducts().subscribe(async (products) => {
        this.products = products;
        console.log(products);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
