import { Component, input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Movimento } from '../../entities';

@Component({
  selector: 'app-movimenti-tabella',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './movimenti-tabella.component.html',
  styleUrl: './movimenti-tabella.component.css',
})
export class MovimentiTabellaComponent {

  movimenti = input.required<Movimento[]>();

}