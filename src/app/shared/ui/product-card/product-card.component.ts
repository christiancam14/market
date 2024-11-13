import { Component, Input } from '@angular/core';
import { Product } from '../../../core/interfaces/Products';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private router: Router) {}

  goProductPage() {
    this.router.navigate([`/product/${this.product.id}`]);
  }
}
