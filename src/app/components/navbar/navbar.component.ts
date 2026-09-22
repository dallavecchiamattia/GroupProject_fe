import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { IfAuthenticatedDirective } from '../../utils/if-authenticated.directive'; // Regola il path
import { IfNotAuthenticatedDirective } from '../../utils/if-not-authenticated.directive'; // Se crei la speculare

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgbDropdownModule,
    IfAuthenticatedDirective,
    IfNotAuthenticatedDirective
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  protected authService = inject(AuthService);
}