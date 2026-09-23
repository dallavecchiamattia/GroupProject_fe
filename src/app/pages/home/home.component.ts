import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MovimentoService } from '../../services/movimento.service';
import { MovimentiComponent } from '../../components/movimenti/movimenti.component';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    RouterLink,
    MovimentiComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private userSrv = inject(UserService);
  protected authSrv = inject(AuthService);
  private movimentoSrv = inject(MovimentoService);

  private account = computed(() => {
    const utente = this.authSrv.currentUser();
    if (!utente) {
      return null;
    }

    const movimenti = this.movimentoSrv.movimenti();

    return { ultimiMovimenti: movimenti }; //tutti i movimenti
  })

  account$ = this.userSrv.getMe();

  currentUser = this.authSrv.currentUser;


}