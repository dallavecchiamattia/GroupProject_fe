import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  RicaricaService,
  OperatoreTelefonico,
  TaglioRicarica,
} from '../../services/ricarica.service';

@Component({
  selector: 'app-ricarica',
  imports: [FormsModule],
  templateUrl: './ricarica.component.html',
  styleUrl: './ricarica.component.css',
})
export class RicaricaComponent {
  private ricaricaService = inject(RicaricaService);
  private cdr = inject(ChangeDetectorRef);

  numeroTelefonico = '';
  operatore: OperatoreTelefonico = 'iliad';
  taglio: TaglioRicarica = 10;

  ricaricaEffettuata = false;
  errorMessage = signal<string | null>(null);

  effettuaRicarica() {
    this.errorMessage.set(null);
    this.ricaricaEffettuata = false;

    this.ricaricaService
      .effettuaRicarica({
        numeroTelefonico: this.numeroTelefonico,
        operatore: this.operatore,
        taglio: this.taglio,
      })
      .subscribe({
        next: (response) => {
          console.log(response);

          this.ricaricaEffettuata = true;

          this.numeroTelefonico = '';
          this.operatore = 'iliad';
          this.taglio = 10;

          this.cdr.detectChanges();
        },

        error: (error) => {
          console.log('Errore ricarica:', error);

          this.errorMessage.set(
            error?.error?.message ||
            'Si è verificato un errore durante la ricarica.'
          );

          this.cdr.detectChanges();
        },
      });
  }
}