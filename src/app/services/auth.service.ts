import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { JwtService } from './jwt.service';

export interface User {
  id: string;
  email: string;
  nomeTitolare: string;
  cognomeTitolare: string;
  dataApertura: Date;
  iban: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected http = inject(HttpClient);
  protected jwtSrv = inject(JwtService);

  protected _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();

  isAuthenticated = computed(() => {
    return !!this.currentUser();
  });

  // usato da login e conferma email: salva il token e imposta l'utente corrente
  private startSession = (res: { user: User, token: string }) => {
    this.jwtSrv.setToken(res.token);
    this.jwtSrv.setNomeTitolare(res.user.nomeTitolare);
    this.jwtSrv.setCognomeTitolare(res.user.cognomeTitolare);
    this._currentUser.set(res.user);
  };
  fetchUser() {
    return this.http.get<{ utente: User }>('/api/account/me')
      .pipe(
        map(res => res.utente),
        catchError(() => {
          this.jwtSrv.removeToken();
          return of(null)
        }),
        tap(user => this._currentUser.set(user))
      )
  }

  login(email: string, password: string) {
    return this.http.post<{ user: User, token: string }>(
      '/api/login',
      { email, password }
    ).pipe(
      tap(this.startSession),
      map(res => res.user)
    );
  }

  register(email: string, password: string, confermaPassword: string, nomeTitolare: string, cognomeTitolare: string) {
    return this.http.post<User>('/api/register', {
      email, password, confermaPassword, nomeTitolare, cognomeTitolare,
    });
  }

  // la conferma dell'email autentica direttamente l'utente (il backend restituisce user + token, come il login)
  confirmEmail(token: string) {
    return this.http.get<{ user: User, token: string }>(`/api/register/confirm/${token}`)
      .pipe(
        tap(this.startSession),
        map(res => res.user)
      );
  }

  resendConfirmation(email: string) {
    return this.http.post<User>('/api/register/resend', { email });
  }

  // In AuthService
  logout() {
    this.jwtSrv.removeToken();
    //this.jwtSrv.removeNomeTitolare();
    //this.jwtSrv.removeCognomeTitolare();

    this._currentUser.set(null);

    // window.location.href = '/login';
  }
}