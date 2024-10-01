import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MessagesService } from '../services/messages.service';
import { Contact } from '../../core/interfaces/Messages';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterModule, FormsModule, MatTooltipModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  public currentUrl: string;
  isOpen: boolean = true;
  contacts: Contact[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private messagesService: MessagesService
  ) {
    this.currentUrl = this.router.url;
    console.log(this.currentUrl);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.messagesService.getContacts().subscribe((data) => {
      this.contacts = data;
    });

    // Suscripción al estado del sidebar
    this.messagesService.getIsOpen().subscribe((state) => {
      this.isOpen = state;
    });
  }

  get filteredContacts() {
    if (!this.searchTerm) {
      return this.contacts; // Si no hay término de búsqueda, devuelve todos los contactos
    }
    return this.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleSideBar() {
    this.isOpen = !this.isOpen;
    this.messagesService.setIsOpen(this.isOpen);
  }

  onClickChat(userId: string): void {
    if (this.isOpen) {
      this.toggleSideBar();
    }
    this.router.navigate(['/messages', userId]);
  }
}
