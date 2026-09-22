import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { map, switchMap } from 'rxjs';
import { MovimentoService } from '../../services/movimento.service';

@Component({
  selector: 'app-movimento-detail',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './movimento-detail.component.html',
  styleUrl: './movimento-detail.component.css',
})
export class MovimentoDetailComponent {
  private activatedRoute = inject(ActivatedRoute);
  private movimentoSrv = inject(MovimentoService);

  movimento$ = this.activatedRoute.paramMap.pipe(
    map(params => params.get('id')!),
    switchMap(id => this.movimentoSrv.getById(id))
  );
}