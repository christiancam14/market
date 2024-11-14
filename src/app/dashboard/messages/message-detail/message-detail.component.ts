import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from '../../services/messages.service';
import { Contact } from '../../../core/interfaces/Messages';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-message-detail',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css'],
})
export class MessageDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollableSection') scrollableSection!: ElementRef;

  contact!: Contact;
  isOpen: boolean = true;
  userId!: string;
  myAvatarUrl: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSHXAeFOYU4v8zDPZ409np-U94dwvcQtilvQ&s';
  messages: any[] = []; // Lista de mensajes en el chat
  newMessage: string = ''; // Para capturar el mensaje nuevo a enviar

  constructor(
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private webSocketService: WebSocketService // Inyectamos el servicio WebSocket
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id')!;
      this.loadContact();
    });

    // Suscripción al estado del sidebar
    this.messagesService.getIsOpen().subscribe((state) => {
      this.isOpen = state;
    });
  }

  ngAfterViewInit(): void {
    // Nos conectamos al WebSocket cuando el componente esté listo
    this.webSocketService.connect(this.userId); // Usamos el método 'connect' de WebSocketService
    this.listenForMessages();
  }

  loadContact() {
    this.messagesService.getChatById(this.userId).subscribe((contact) => {
      this.contact = contact;
      this.messages = contact.messages || [];
      this.scrollToBottom();
    });
  }

  listenForMessages() {
    // Suscripción para recibir mensajes nuevos en tiempo real
    this.webSocketService.getMessages().subscribe((message) => {
      const parsedMessage = JSON.parse(message); // Si es necesario parsear el mensaje
      if (parsedMessage.chatId === this.userId) {
        this.messages.push(parsedMessage);
        this.scrollToBottom();
      }
    });
  }

  scrollToBottom() {
    // Hacer scroll hasta el último mensaje
    this.scrollableSection.nativeElement.scrollTop =
      this.scrollableSection.nativeElement.scrollHeight;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      // Enviar el mensaje al WebSocket
      this.webSocketService.sendMessage(JSON.stringify({
        chatId: this.userId,
        message: this.newMessage,
        senderId: 'user-id', // Aquí debes reemplazar por el ID real del usuario
      }));
      this.newMessage = ''; // Limpiar el campo de mensaje después de enviarlo
    }
  }

  toggleSideBar() {
    this.isOpen = !this.isOpen;
    this.messagesService.setIsOpen(this.isOpen);
  }
}
