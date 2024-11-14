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
  private messagesSubject: Subject<string> = new Subject<string>(); // Para manejar los mensajes
  private activeChatsSubject: Subject<Contact[]> = new Subject<Contact[]>();

  constructor(private httpClient: HttpClient) {}

  // Abre la conexión WebSocket
  connect(userUuid: string): void {
    // Establece la URL del WebSocket (ajusta según tu configuración)
    const wsUrl = `ws://localhost:8080/ws/chat?userUuid=${userUuid}`;

    // Crea la conexión WebSocket
    this.socket = new WebSocket(wsUrl);

    // Al recibir un mensaje, lo enviamos al observable
    this.socket.onmessage = (event) => {
      this.messagesSubject.next(event.data);
    };

    // Manejo de errores
    this.socket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    // Manejo de cierre de la conexión
    this.socket.onclose = (event) => {
      console.log('WebSocket closed:', event);
    };
  }

  getAllContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${this.baseUrl}/users/all?role=USER`); // Cambia esta URL por la de tu API
  }

  // Enviar un mensaje al servidor WebSocket
  sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket no está abierto');
    }
  }

  getActiveChats(): Observable<Contact[]> {
    return this.activeChatsSubject.asObservable();
  }

  // Observar los mensajes recibidos
  getMessages() {
    return this.messagesSubject.asObservable();
  }

  // Cerrar la conexión WebSocket
  disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  createChat(contactId: string): Observable<any> {
    const message = {
      type: 'createChat',
      contactId: contactId,
    };
    if (this.socket) {
      this.socket.send(JSON.stringify(message));
    }

    // Puedes devolver un observable que se complete cuando el chat se haya creado
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
