import { Component } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { IconComponent } from '../../icon/icon.component';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent], // Elimina BrowserAnimationsModule
  animations: [
    trigger('slideInOut', [
      state(
        'void',
        style({
          height: '0',
          opacity: '0',
          overflow: 'hidden',
          transform: 'translateX(-100%)',
        })
      ),
      state(
        '*',
        style({
          height: '*',
          opacity: '1',
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [animate('300ms ease-in-out')]),
      transition('* => void', [
        animate(
          '300ms ease-in-out',
          style({
            height: '0',
            opacity: '0',
            transform: 'translateX(100%)',
            overflow: 'hidden',
          })
        ),
      ]),
    ]),
    trigger('fadeIn', [
      state('void', style({ opacity: '0' })),
      state('*', style({ opacity: '1' })),
      transition('void => *', [animate('300ms ease-in-out')]),
      transition('* => void', [animate('300ms ease-in-out')]),
    ]),
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Corrige styleUrl a styleUrls
})
export class HeaderComponent {
  isHeaderOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleHeaderOpen() {
    this.isHeaderOpen = !this.isHeaderOpen;
  }

  onLogOut() {
    this.router.navigate(['/auth/login']);
  }
}
