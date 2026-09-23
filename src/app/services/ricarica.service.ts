import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type OperatoreTelefonico =
  | 'iliad'
  | 'tim'
  | 'vodafone'
  | 'windtre'
  | 'postemobile';

export type TaglioRicarica = 5 | 10 | 20 | 30 | 50;

export interface RicaricaRequest {
  numeroTelefonico: string;
  operatore: OperatoreTelefonico;
  taglio: TaglioRicarica;
}

export interface RicaricaResult {
  movimentoId: string;
  saldo: number;
  data: string;
}

@Injectable({
  providedIn: 'root',
})
export class RicaricaService {
  private http = inject(HttpClient);

  effettuaRicarica(
    dati: RicaricaRequest
  ): Observable<RicaricaResult> {
    return this.http.post<RicaricaResult>(
      '/api/ricariche',
      dati
    );
  }
}