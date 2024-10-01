import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  animations: [
    trigger('panelState', [
      state(
        'initial',
        style({
          transform: 'translateX(100%)',
          opacity: 1,
        })
      ),
      state(
        'hidden',
        style({
          transform: 'translateX(100%)',
          opacity: 1,
        })
      ),
      state(
        'visible',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      state(
        'left',
        style({
          transform: 'translateX(-100%)',
          opacity: 1,
        })
      ),
      transition('initial => visible', animate('500ms linear')),
      transition('hidden => visible', animate('500ms linear')),
      transition('visible => left', animate('500ms linear')),
    ]),
  ],
})
export class LayoutComponent {
  public url: string;
  public panelState = 'hidden';
  constructor(private router: Router) {
    this.url = router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.panelState = 'visible'; // Mostrar el panel al iniciar la navegación

        setTimeout(() => {
          this.panelState = 'left'; // Mover el panel a la derecha después de un tiempo
        }, 500); // Ajusta el tiempo según la duración de tu animación
      }
    });
  }
}
