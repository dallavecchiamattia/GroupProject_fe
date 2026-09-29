import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-confirm-email',
  imports: [RouterLink],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css',
})
export class ConfirmEmailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private authSrv = inject(AuthService);

  confirmed = signal(false);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token')!;
    this.authSrv.confirmEmail(token).subscribe({
      next: () => this.confirmed.set(true),
      error: response => this.errorMessage.set(response.error?.message ?? 'Errore durante la conferma')
    });
  }
}