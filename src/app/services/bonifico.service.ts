import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BonificoRequest, Movimento } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class BonificoService {
  private http = inject(HttpClient);

  // POST /api/bonifici —> verifica l'IBAN del destinatario + saldo disponibile sono gestite lato server
  effettua(dati: BonificoRequest): Observable<Movimento> {
    return this.http.post<Movimento>('/api/bonifici', dati);
  }
}
