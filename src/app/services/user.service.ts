import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './auth.service';

export interface Categoria {
  id: string;
  nomeCategoria: string;
  tipologia: 'Entrata' | 'Uscita';
}

export interface Movimento {
  id: string;
  contoCorrenteId: string;
  data: string;
  importo: number;
  saldo: number;
  categoriaMovimentoId: string;
  categoria: Categoria;
  descrizioneEstesa: string;
}

export interface AccountMe {
  utente: User;
  saldo: number;
  ultimiMovimenti: Movimento[];
}

export interface ChangePasswordRequest {
  vecchiaPassword: string;
  nuovaPassword: string;
  confermaNuovaPassword: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  getMe(): Observable<AccountMe> {
    return this.http.get<AccountMe>('/api/account/me');
  }
  getProfilo(): Observable<User> {
    return this.http.get<User>('/api/account/profilo');
  }
  changePassword(dati: ChangePasswordRequest): Observable<User> {
    return this.http.patch<User>('/api/account/password', dati);
  }
}

