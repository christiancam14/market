import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { jwtDecode } from 'jwt-decode';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { Contact } from '../../core/interfaces/Messages';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [MatCardModule, MatTabsModule, CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  allContacts: Contact[] = [];
  myContacts: Contact[] = [];
  selectedTab: number = 0; // Pestaña seleccionada (0: Todos, 1: Amigos)
  userId: string = ''; // ID del usuario (debería ser dinámico)

  constructor(private userService: UserService) {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userId = decoded.sub;
      console.log(this.userId);
    }
  }

  ngOnInit(): void {
    this.loadAllContacts();
    this.loadMyContacts();
  }

  // Cargar todos los contactos
  loadAllContacts() {
    this.userService.getAllContacts().subscribe(
      (contacts) => {
        this.allContacts = contacts;
      },
      (error) => {
        console.error('Error loading all contacts', error);
      }
    );
  }

  // Cargar solo mis contactos (amigos)
  loadMyContacts(): void {
    this.userService.getMyContacts(this.userId).subscribe(
      (contacts) => {
        console.log({ contacts });
        this.myContacts = contacts; // Asigna la respuesta a myContacts
        console.log(this.myContacts);
      },
      (error) => {
        console.error('Error al cargar los contactos:', error);
      }
    );
  }

  // Cambiar de pestaña
  selectTab(tabIndex: number) {
    this.selectedTab = tabIndex;
  }
}
