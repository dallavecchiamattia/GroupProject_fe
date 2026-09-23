import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landingPage.component.html',
  styleUrl: './landingPage.component.css'
})
export class LandingPageComponent { }