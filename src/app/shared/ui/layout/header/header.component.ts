import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { IconComponent } from '../../icon/icon.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
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
  imports: [CommonModule, RouterModule, IconComponent, MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // encapsulation: ViewEncapsulation.None,
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
})
export class HeaderComponent {
  isHeaderOpen: boolean = false;
  isHavingMessages: boolean = false;
  navOptions: {
    label: string;
    url: string;
    icon: () => string;
    className: () => string;
  }[] = [
    { label: 'Inicio', url: '/', icon: () => 'home', className: () => '' },
    {
      label: 'Perfil',
      url: '/perfil',
      icon: () => 'person',
      className: () => '',
    },
    {
      label: 'Mensajes',
      url: '/messages',
      icon: () => (this.isHavingMessages ? 'mark_chat_unread' : 'chat_bubble'),
      className: () => (this.isHavingMessages ? 'animate-pulse flex' : 'flex'),
    },
  ];

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.toggleHeaderOpen();
      }
    });
  }

  toggleMessages() {
    this.isHavingMessages = !this.isHavingMessages;
  }

  toggleHeaderOpen() {
    this.isHeaderOpen = !this.isHeaderOpen;
  }

  onLogOut() {
    this.router.navigate(['/auth/login']);
  }

  isActive(url: string): boolean {
    const currentUrl = this.router.url;
    return currentUrl === url || currentUrl.startsWith(`${url}/`);
  }
}
