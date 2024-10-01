import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('panelState', [
      state(
        'hidden',
        style({
          visibility: 'hidden',
          transform: 'translateX(100%)',
        })
      ),
      state('visible', style({})),
      state(
        'left',
        style({
          transform: 'translateX(-100%)',
        })
      ),
      transition('hidden => visible', animate('500ms ease-in-out')),
      transition('visible => left', animate('500ms ease-in-out')),
    ]),
  ],
})
export class AppComponent {
  panelState = 'hidden';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.panelState = 'visible'; // Mostrar el panel al iniciar la navegación

        setTimeout(() => {
          this.panelState = 'left'; // Mover el panel a la izquierda después de un tiempo
        }, 500); // Ajusta el tiempo según la duración de tu animación
      }
    });
  }
}
