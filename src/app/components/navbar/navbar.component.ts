import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../services/auth.service';
import { JwtService } from '../../services/jwt.service';

import { IfAuthenticatedDirective } from '../../utils/if-authenticated.directive';
import { IfNotAuthenticatedDirective } from '../../utils/if-not-authenticated.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgbDropdownModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  protected authService = inject(AuthService);
  protected jwtSrv = inject(JwtService);

  currentUser = this.authService.fetchUser;
}