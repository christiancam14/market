import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../../core/enums/user-role.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Redirigir
    // this.authService.setUserRole(UserRole.User);
    this.router.navigate(['/']);
  }
}
