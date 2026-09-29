import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landingPage.component.html',
  styleUrl: './landingPage.component.css'
})
export class LandingPageComponent {
  auth = inject(AuthService);
}