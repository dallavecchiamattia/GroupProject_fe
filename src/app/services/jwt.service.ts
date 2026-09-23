import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {

  // TOKEN

  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  removeToken() {
    localStorage.removeItem('authToken');
  }


  // NOME TITOLARE

  setNomeTitolare(nome: string) {
    localStorage.setItem('nomeTitolare', nome);
  }

  getNomeTitolare(): string | null {
    return localStorage.getItem('nomeTitolare');
  }

  removeNomeTitolare() {
    localStorage.removeItem('nomeTitolare');
  }


  // COGNOME TITOLARE

  setCognomeTitolare(cognome: string) {
    localStorage.setItem('cognomeTitolare', cognome);
  }

  getCognomeTitolare(): string | null {
    return localStorage.getItem('cognomeTitolare');
  }

  removeCognomeTitolare() {
    localStorage.removeItem('cognomeTitolare');
  }
}