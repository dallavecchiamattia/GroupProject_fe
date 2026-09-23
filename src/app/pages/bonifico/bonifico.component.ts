import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { Movimento } from '../../entities';
import { BonificoService } from '../../services/bonifico.service';
import { MovimentoService } from '../../services/movimento.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-bonifico',
  imports: [ReactiveFormsModule, RouterLink, CurrencyPipe],
  templateUrl: './bonifico.component.html',
  styleUrl: './bonifico.component.css',
})

export class BonificoComponent {
  protected fb = inject(FormBuilder);
  private bonificoSrv = inject(BonificoService);
  private movimentoSrv = inject(MovimentoService);
  private userSrv = inject(UserService);
  private destroyRef = inject(DestroyRef);

  bonificoForm = this.fb.group({
    ibanDestinatario: ['', { validators: [Validators.required] }],
    importo: [null as number | null, { validators: [Validators.required, Validators.min(0.01)] }],  //valore minimo 0.01 euro (niente bonifici a zero o negativi)
  });

  errorMessage = signal<string | null>(null);
  esito = signal<Movimento | null>(null);   //restituisce il Movimento al backend quando il bonifico va a buon fine
  isSubmitting = signal(false);
  saldoAttuale = signal<number | null>(null);
  saldoInsufficiente = signal(false);

  ngOnInit() {
    this.aggiornaSaldo();

    this.bonificoForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.errorMessage.set(null));
  }
  /** Ricarica il saldo attuale dell'utente (GET /api/account/me) */
  private aggiornaSaldo() {
    this.userSrv.getMe().subscribe(me => {
      this.saldoAttuale.set(me.saldo);
      this.controllaSaldo();
    });
  }

  /** Confronto lato client tra importo inserito e saldo disponibile: aggiorna errore e flag di blocco invio */
  private controllaSaldo() {
    const saldo = this.saldoAttuale();
    const importo = this.bonificoForm.controls.importo.value;

    if (saldo !== null && importo !== null && importo > saldo) {
      this.saldoInsufficiente.set(true);
      this.errorMessage.set("Importo maggiore del saldo: bonifico impossibile da effettuare");
    } else {
      this.saldoInsufficiente.set(false);
      this.errorMessage.set(null);
    }
  }

  invia() {
    if (this.bonificoForm.invalid) {    //il bottone nel template è disabilitato quando bonificoForm.invalid
      return;
    }

    const { ibanDestinatario, importo } = this.bonificoForm.value;

    // Blocco lato client: non chiamo nemmeno il backend se l'importo supera il saldo noto
    const saldo = this.saldoAttuale();
    if (saldo !== null && importo! > saldo) {
      this.saldoInsufficiente.set(true);
      this.errorMessage.set("Importo maggiore del saldo: bonifico impossibile da effettuare");
      return;
    }

    this.errorMessage.set(null);
    this.esito.set(null);
    this.isSubmitting.set(true);

    this.bonificoSrv
      .effettua({
        ibanDestinatario: ibanDestinatario!,
        importo: importo!,
      })
      .pipe(
        catchError(response => {
          const codiceErrore = response.error?.error;

          let message: string;
          if (codiceErrore === 'NotFound') {
            message = 'IBAN inesistente';
          } else if (codiceErrore === 'InsufficientBalance') {
            // safety net: il backend rifiuta comunque, anche se il controllo lato client dovesse sfuggire
            message = "Importo maggiore del saldo: bonifico impossibile da effettuare";
          } else if (codiceErrore === 'SameAccount') {
            message = 'Non puoi effettuare un bonifico al te stesso';
          } else {
            message = response.error?.message ?? 'Bonifico non riuscito';
          }

          this.errorMessage.set(message);
          return throwError(() => response);
        }),
        finalize(() => this.isSubmitting.set(false)),
      )
      .subscribe(movimento => {
        this.esito.set(movimento);
        this.movimentoSrv.fetch(); // aggiorna la lista movimenti con il nuovo addebito
        this.aggiornaSaldo(); // il saldo è cambiato: lo ricarico per i prossimi controlli
        this.bonificoForm.reset();
      });
  }
}
