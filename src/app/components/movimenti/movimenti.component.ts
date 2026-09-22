import { Component, computed, inject, input } from '@angular/core';
import { MovimentoService } from '../../services/movimento.service';
import { MovimentoCardComponent } from '../../components/movimento-card/movimento-card.component';
import { Movimento } from '../../entities';

@Component({
  selector: 'app-movimenti',
  imports: [MovimentoCardComponent],
  templateUrl: './movimenti.component.html',
  styleUrl: './movimenti.component.css',
})
export class MovimentiComponent {
  private movimentoSrv = inject(MovimentoService);

  movimentiInput = input<Movimento[]>();

  movimenti = computed(() => (this.movimentiInput() ?? this.movimentoSrv.movimenti()).slice(0, 5));
}