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

  /*constructor() {
    this.fetchUser().subscribe()
  }*/

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
      tap(res => {
        this.jwtSrv.setToken(res.token);
        /*this.jwtSrv.setNomeTitolare(res.user.nomeTitolare);
        this.jwtSrv.setCognomeTitolare(res.user.cognomeTitolare);*/
      }),
      map(res => res.user),
      tap(user => this._currentUser.set(user))
    );
  }

  register(email: string, password: string, confermaPassword: string, nomeTitolare: string, cognomeTitolare: string) {
    return this.http.post<{ user: User, token: string }>('/api/register', {
      email,
      password,
      confermaPassword,
      nomeTitolare,
      cognomeTitolare,
    }).pipe(
      tap(res => {
        this.jwtSrv.setToken(res.token);
        this.jwtSrv.setNomeTitolare(res.user.nomeTitolare);
        this.jwtSrv.setCognomeTitolare(res.user.cognomeTitolare);
      }),
      map(res => res.user),
      tap(user => this._currentUser.set(user))
    );
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