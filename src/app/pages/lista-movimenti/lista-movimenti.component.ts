import { Component, computed, inject, input } from '@angular/core';
import { MovimentoService } from '../../services/movimento.service';
import { Movimento } from '../../entities';
import { MovimentoCardComponent } from '../../components/movimento-card/movimento-card.component';

@Component({
  selector: 'app-lista-movimenti',
  imports: [MovimentoCardComponent],
  templateUrl: './lista-movimenti.component.html',
  styleUrl: './lista-movimenti.component.css',
})
export class ListaMovimentiComponent {
  private movimentoSrv = inject(MovimentoService);

  movimentiInput = input<Movimento[]>();

  movimenti = computed(() => (this.movimentiInput() ?? this.movimentoSrv.movimenti()))
}


//non stampa la lista, prova a rivedere da home 
//che probabilmente bisogna reindirizzare da lì