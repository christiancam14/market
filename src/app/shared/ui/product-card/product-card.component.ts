import { Component, Input } from '@angular/core';
import { Product } from '../../../core/interfaces/Products';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconComponent } from "../icon/icon.component";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule, CommonModule, IconComponent],
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
