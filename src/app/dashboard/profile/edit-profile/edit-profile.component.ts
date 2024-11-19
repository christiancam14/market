import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../core/interfaces/User';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { jwtDecode } from 'jwt-decode';
import { IconComponent } from '../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IconComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  isLoading: boolean = true;
  errorMessage: string | null = null;
  userForm: FormGroup;
  userId: string = '';
  user: User | null = null;
  imgUrl: string = '';
  imgFile: File | null = null;
  fileName: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // Inicialización del formulario reactivo
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      cedula: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userId = decoded.sub;
      this.loadUserProfile();
    }
  }
  loadUserProfile() {
    this.userService.getUserById(this.userId).subscribe(
      (data) => {
        this.user = data;
        this.imgUrl = `https://placehold.co/400x400/EEE/31343C?font=montserrat&text=${this.user.username}`;
        // Cargar los valores del usuario en el formulario
        this.userForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          cedula: this.user.cedula,
          address: this.user.address,
          role: this.user.role,
        });
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error al cargar el perfil.';
        this.isLoading = false;
      }
    );
  }

  onImageChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      // Mostrar el nombre del archivo
      this.fileName = file.name;

      // Mostrar la vista previa de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imgUrl = reader.result as string; // Asignar la URL de la imagen
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.userForm.invalid) {
      return;
    }

    this.isLoading = true;
    const updatedUser: User = {
      ...this.userForm.value,
      id: this.userId,
      username: this.user?.username ?? '', // No modificar el username
    };

    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('sal');
        this.router.navigate(['/perfil']); // Redirigir al perfil una vez guardado
      },
      error: (error) => {
        this.isLoading = false;

        // this.errorMessage = 'Error al guardar los cambios.';
      },
      complete: () => {
        // Código opcional cuando la suscripción se completa
      },
    });
  }
}
