import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Contact, ChatMessage } from '../../core/interfaces/Messages';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  chatMessages: ChatMessage[] = [
    {
      sender: 'outgoing',
      content: '¡Hola, Ana! ¿Cómo estás?',
      avatarUrl: 'https://placehold.co/200x/ffa8e4/ffffff.svg',
    },
    {
      sender: 'incoming',
      content: '¡Hola, Carlos! Estoy bien, gracias. ¿Y tú?',
      avatarUrl: 'https://placehold.co/200x/ad922e/ffffff.svg',
    },
    {
      sender: 'outgoing',
      content:
        'También bien. Estaba pensando en nuestros planes para el fin de semana. ¿Tienes algo en mente?',
      avatarUrl: 'https://placehold.co/200x/ffa8e4/ffffff.svg',
    },
    {
      sender: 'incoming',
      content:
        'Sí, me gustaría ir al nuevo café que abrieron en el centro. He escuchado que tienen un gran menú de postres.',
      avatarUrl: 'https://placehold.co/200x/ad922e/ffffff.svg',
    },
    {
      sender: 'outgoing',
      content:
        '¡Suena genial! Siempre he querido probar su tarta de chocolate.',
      avatarUrl: 'https://placehold.co/200x/ffa8e4/ffffff.svg',
    },
    {
      sender: 'incoming',
      content:
        'Exacto, dicen que es espectacular. También podríamos ver una película después. ¿Te parece?',
      avatarUrl: 'https://placehold.co/200x/ad922e/ffffff.svg',
    },
    {
      sender: 'outgoing',
      content: '¡Me parece perfecto! ¿Cuál película te gustaría ver?',
      avatarUrl: 'https://placehold.co/200x/ffa8e4/ffffff.svg',
    },
    {
      sender: 'incoming',
      content:
        'He oído buenas críticas de la nueva película de acción que estrenaron. Podríamos buscar horarios.',
      avatarUrl: 'https://placehold.co/200x/ad922e/ffffff.svg',
    },
    {
      sender: 'outgoing',
      content:
        'Claro, voy a revisar los horarios de la película. ¿A qué hora te gustaría ir al café?',
      avatarUrl: 'https://placehold.co/200x/ffa8e4/ffffff.svg',
    },
    {
      sender: 'incoming',
      content:
        'Podríamos ir a eso de las 4, y después de comer, ver la película.',
      avatarUrl: 'https://placehold.co/200x/ad922e/ffffff.svg',
    },
    {
      sender: 'outgoing',
      content: 'Me parece una buena idea. ¡No puedo esperar para el café!',
      avatarUrl: 'https://placehold.co/200x/ffa8e4/ffffff.svg',
    },
    {
      sender: 'incoming',
      content: 'Yo tampoco. ¡Será un buen día!',
      avatarUrl: 'https://placehold.co/200x/ad922e/ffffff.svg',
    },
    {
      sender: 'outgoing',
      content: 'Sí, será divertido. Nos vemos entonces, Ana.',
      avatarUrl: 'https://placehold.co/200x/ffa8e4/ffffff.svg',
    },
    {
      sender: 'incoming',
      content: '¡Hasta luego, Carlos!',
      avatarUrl: 'https://placehold.co/200x/ad922e/ffffff.svg',
    },
  ];

  contacts: Contact[] = [
    {
      name: 'Alice',
      avatarUrl: 'https://placehold.co/200x/ffa8e4/ffffff.svg',
      message: 'Hoorayy!!',
      chat: this.chatMessages,
      id: '1',
    },
    {
      name: 'Martin',
      avatarUrl: 'https://placehold.co/200x/ad922e/ffffff.svg',
      message: 'That pizza place was amazing!',
      chat: this.chatMessages,
      id: '2',
    },
    {
      name: 'Charlie',
      avatarUrl: 'https://placehold.co/200x/2e83ad/ffffff.svg',
      message: 'Any movie recommendations?',
      chat: this.chatMessages,
      id: '3',
    },
    {
      name: 'David',
      avatarUrl: 'https://placehold.co/200x/c2ebff/0f0b14.svg',
      message: 'Finished a great book!',
      chat: this.chatMessages,
      id: '4',
    },
    {
      name: 'Ella',
      avatarUrl: 'https://placehold.co/200x/e7c2ff/7315d1.svg',
      message: 'Weekend plans?',
      chat: this.chatMessages,
      id: '5',
    },
    {
      name: 'Fiona',
      avatarUrl: 'https://placehold.co/200x/ffc2e2/ffdbdb.svg',
      message: 'New art exhibit?',
      chat: this.chatMessages,
      id: '6',
    },
    {
      name: 'George',
      avatarUrl: 'https://placehold.co/200x/f83f3f/4f4f4f.svg',
      message: 'Tried a new cafe!',
      chat: this.chatMessages,
      id: '7',
    },
    {
      name: 'Hannah',
      avatarUrl: 'https://placehold.co/200x/dddddd/999999.svg',
      message: 'Hiking trip next month?',
      chat: this.chatMessages,
      id: '8',
    },
  ];

  // BehaviorSubject para manejar el estado compartido
  private isOpenSubject = new BehaviorSubject<boolean>(true);
  private contactsSubject = new BehaviorSubject<Contact[]>(this.contacts);

  constructor() {}

  // Método para obtener el estado del sidebar
  getIsOpen(): Observable<boolean> {
    return this.isOpenSubject.asObservable();
  }

  // Método para cambiar el estado del sidebar
  setIsOpen(state: boolean): void {
    this.isOpenSubject.next(state);
  }

  toogleIsOpen(): void {
    const currentState = this.isOpenSubject.asObservable();
    this.isOpenSubject.next(!currentState);
  }

  // Method to retrieve contact list
  getContacts(): Observable<Contact[]> {
    return this.contactsSubject.asObservable();
    return of(this.contacts);
  }

  getChatById(id: string): Observable<Contact> {
    const contact = this.contacts.find((contact) => contact.id === id);
    return of(contact!);
  }
}
