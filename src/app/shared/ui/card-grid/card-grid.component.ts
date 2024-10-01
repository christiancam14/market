import { Component } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.css'
})
export class CardGridComponent {

}
