import { Component } from '@angular/core';
import { ProductCardComponent } from '../shared/ui/product-card/product-card.component';
import { CardGridComponent } from '../shared/ui/card-grid/card-grid.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardGridComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
