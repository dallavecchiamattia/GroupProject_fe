import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movimento } from '../../entities';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-movimento-card',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './movimento-card.component.html',
  styleUrl: './movimento-card.component.css',
})
export class MovimentoCardComponent {
  movimenti = input.required<Movimento>();
}
