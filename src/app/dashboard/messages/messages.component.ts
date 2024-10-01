import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconComponent } from '../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  isOpen: boolean = true;

  toggleSideBar() {
    this.isOpen = !this.isOpen;
  }
}
