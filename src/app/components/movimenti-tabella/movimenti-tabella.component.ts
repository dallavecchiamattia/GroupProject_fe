import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Movimento } from '../../entities';

@Component({
  selector: 'app-movimenti-tabella',
  imports: [CurrencyPipe],
  templateUrl: './movimenti-tabella.component.html',
  styleUrl: './movimenti-tabella.component.css',
})
export class MovimentiTabellaComponent {

  movimenti = input.required<Movimento[]>();

}