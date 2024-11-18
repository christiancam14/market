// messages.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../services/web-socket.service';
import { Contact } from '../../core/interfaces/Messages';
import { MessagesService } from '../services/messages.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTooltipModule,
    FormsModule,
    IconComponent,
  ],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  public currentUrl: string;
  isOpen: boolean = true;
  contacts: Contact[] = [];
  searchTerm: string = '';
  private wsSubscription: Subscription | null = null; // Para la suscripción WebSocket
  private userUuid: string | null = 'some-uuid'; // Debes obtener el UUID del usuario actual (ej. desde el auth)

  constructor(
    private router: Router,
    private messagesService: MessagesService,
    private webSocketService: WebSocketService
  ) {
    this.currentUrl = this.router.url;
  }

  ngOnInit(): void {
    // Conectar al WebSocket al iniciar el componente
    this.webSocketService.connect(this.userUuid!);

    // Suscripción al WebSocket para obtener todos los contactos
    this.webSocketService.getAllContacts().subscribe((data: Contact[]) => {
      this.contacts = data;
    });

    // Suscripción al WebSocket para escuchar mensajes nuevos
    this.webSocketService.getMessages().subscribe((message: string) => {
      // Lógica para manejar nuevos mensajes
      console.log('Nuevo mensaje:', message);
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

    // Desconectar el WebSocket
    this.webSocketService.disconnect();
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
    const chatExistente = this.contacts.find(
      (contact) => contact.id === contactId
    );

    if (!chatExistente) {
      // Crear el chat si no existe
      this.createChat(contactId);
    }

    // Redirigir al detalle del chat (con la ruta correcta)
    this.router.navigate([`/messages/${contactId}`]);
  }

  createChat(contactId: string): void {
    // Llamar al servicio para crear el chat
    this.webSocketService.createChat(contactId).subscribe(() => {
      // Suscribirse a los chats activos para actualizarlos
      this.webSocketService.getActiveChatsObservable().subscribe((chats) => {
        this.contacts = chats; // Actualiza la lista de contactos con los chats activos
      });
    });
  }
}
