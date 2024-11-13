import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../core/interfaces/User';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  isLoading: boolean = true; // Indicar si está en carga
  errorMessage: string | null = null; // Para manejar errores
  imgUrl: string = '';
  userId: string = '';
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Decodificar el JWT para obtener el ID
      const decoded: any = jwtDecode(token);
      this.userId = decoded.sub;
      this.loadUserProfile();
    }
  }

  loadUserProfile() {
    // Llamar al servicio para obtener el perfil usando el ID del usuario
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.user = data;
      this.imgUrl = `https://placehold.co/400x400/EEE/31343C?font=montserrat&text=${this.user.username}`;
      this.isLoading = false;
    });
  }
}
