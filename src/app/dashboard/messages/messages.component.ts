import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MessagesService } from '../services/messages.service';
import { Contact } from '../../core/interfaces/Messages';
import { Subscription } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WebSocketService } from '../services/web-socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    RouterModule,
    MatTooltipModule,
    FormsModule,
  ],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  public currentUrl: string;
  isOpen: boolean = true;
  contacts: Contact[] = [];
  searchTerm: string = '';
  private wsSubscription: Subscription | null = null; // Para almacenar la suscripción al WebSocket

  constructor(
    private router: Router,
    private messagesService: MessagesService,
    private webSocketService: WebSocketService // Inyectar WebSocketService
  ) {
    this.currentUrl = this.router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  ngOnInit(): void {
    // Suscripción al WebSocket para obtener todos los contactos
    this.wsSubscription = this.webSocketService
      .getAllContacts()  // Asegúrate de tener este método en tu servicio
      .subscribe((data: Contact[]) => {
        this.contacts = data;
      });

    // Suscripción al estado del sidebar
    this.messagesService.getIsOpen().subscribe((state) => {
      this.isOpen = state;
    });
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al WebSocket al destruir el componente
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
  }

  get filteredContacts() {
    // Filtrar los contactos por el término de búsqueda
    if (!this.searchTerm) {
      return this.contacts;
    }
    return this.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleSideBar() {
    this.isOpen = !this.isOpen;
    this.messagesService.setIsOpen(this.isOpen);
  }

  onClickChat(contactId: string) {
    // Aquí usas la variable "contacts" en lugar de "chats"
    const chatExistente = this.contacts.find(
      (contact) => contact.id === contactId
    );
    if (!chatExistente) {
      // Crear el chat
      this.createChat(contactId);
    }
    // Redirigir a la pantalla del chat (si es necesario)
    this.router.navigate([`/messages/${contactId}`]);
  }

  createChat(contactId: string): void {
    // Lógica para crear un chat nuevo si no hay chats activos
    this.webSocketService.createChat(contactId).subscribe(() => {
      // Después de crear el chat, podemos obtener los chats activos de nuevo
      this.webSocketService.getActiveChats().subscribe((data: Contact[]) => {
        this.contacts = data;
      });
    });
  }
}
