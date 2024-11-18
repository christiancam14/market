import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Contact } from '../../core/interfaces/Messages';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environmets';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private baseUrl = `${environment.endpoint}/api`;
  private socket: WebSocket | null = null;
  private messagesSubject: Subject<string> = new Subject<string>();
  private activeChatsSubject: Subject<Contact[]> = new Subject<Contact[]>();

  constructor(private httpClient: HttpClient) {}

  // Abre la conexión WebSocket
  connect(userUuid: string): void {
    const wsUrl = `ws://localhost:8080/ws/chat?userUuid=${userUuid}`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'chatCreated') {
        this.getActiveChats();  // Después de crear el chat, actualizar los chats activos
      } else if (data.type === 'newMessage') {
        this.messagesSubject.next(data.message);
      } else if (data.type === 'activeChats') {
        this.activeChatsSubject.next(data.chats); // Emitir los chats activos
      }
    };

    this.socket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket closed:', event);
    };
  }

  // Obtener todos los contactos
  getAllContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${this.baseUrl}/users/all?role=USER`);
  }

  // Enviar mensaje
  sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket no está abierto');
    }
  }

  // Obtener los chats activos
  getActiveChats(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'getActiveChats' }));
    }
  }

  // Obtener los mensajes
  getMessages(): Observable<string> {
    return this.messagesSubject.asObservable();
  }

  // Obtener los chats activos como un Observable
  getActiveChatsObservable(): Observable<Contact[]> {
    return this.activeChatsSubject.asObservable();
  }

  // Cerrar la conexión WebSocket
  disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  // Crear un chat
  createChat(contactId: string): Observable<any> {
    const message = {
      type: 'createChat',
      contactId: contactId,
    };
    if (this.socket) {
      this.socket.send(JSON.stringify(message));
    }

    return new Observable((observer) => {
      if (this.socket) {
        this.socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === 'chatCreated') {
            observer.next(data);
            observer.complete();
          }
        };
      }
    });
  }
}
