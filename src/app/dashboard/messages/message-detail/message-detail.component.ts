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

@Component({
  selector: 'app-message-detail',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './message-detail.component.html',
  styleUrl: './message-detail.component.css',
})
export class MessageDetailComponent implements OnInit {
  @ViewChild('scrollableSection') scrollableSection!: ElementRef;

  contact!: Contact;
  isOpen: boolean = true;
  userId!: string;
  myAvatarUrl: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSHXAeFOYU4v8zDPZ409np-U94dwvcQtilvQ&s';

  constructor(
    private route: ActivatedRoute,
    private messagesService: MessagesService
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

  loadContact() {
    this.messagesService.getChatById(this.userId).subscribe((state) => {
      this.contact = state;

      this.scrollableSection.nativeElement.scrollTop =
        this.scrollableSection.nativeElement.scrollHeight;
    });
  }

  toggleSideBar() {
    this.isOpen = !this.isOpen;
    this.messagesService.setIsOpen(this.isOpen);
  }
}
