import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movimento } from '../../entities';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movimento-card',
  imports: [
    FormsModule,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './movimento-card.component.html',
  styleUrl: './movimento-card.component.css',
})
export class MovimentoCardComponent {
  movimenti = input.required<Movimento>();
}