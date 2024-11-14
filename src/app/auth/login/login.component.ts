import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../../core/enums/user-role.enum';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Redirigir
    // this.router.navigate(['/']);
    console.log(this.credentials);
    try {
      this.authService.login(this.credentials).subscribe(async (res) => {
        console.log(res);
        if (res.ok) {
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('userRole', res.role);
          localStorage.setItem('userName', res.nombre);
          if (res.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        } else {
          this.errorMessage = res.msg;
        }
      });
    } catch (err) {
      console.error(err);
      this.errorMessage = 'Hubo un error en el inicio de sesión.';
    }
  }
}
