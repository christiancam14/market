import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconComponent } from '../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements AfterViewInit {
  @ViewChild('scrollableSection') scrollableSection!: ElementRef;

  isOpen: boolean = true;

  ngAfterViewInit(): void {
    this.scrollableSection.nativeElement.scrollTop =
      this.scrollableSection.nativeElement.scrollHeight;
  }

  toggleSideBar() {
    this.isOpen = !this.isOpen;
  }
}
