import { Component, inject, OnInit } from '@angular/core';
import { MovimentoService } from '../../services/movimento.service';
import { CategoriaService } from '../../services/categorie.service';
import { MovimentoCardComponent } from '../../components/movimento-card/movimento-card.component';
import { Categoria } from '../../entities';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-movimenti',
  imports: [MovimentoCardComponent, FormsModule],
  templateUrl: './lista-movimenti.component.html',
  styleUrl: './lista-movimenti.component.css',
})
export class ListaMovimentiComponent implements OnInit {
  private movimentoSrv = inject(MovimentoService);
  private categoriaSrv = inject(CategoriaService);

  movimenti = this.movimentoSrv.movimenti;

  categorie: Categoria[] = [];

  categoriaId = '';
  dataInizio = '';
  dataFine = '';

  ngOnInit() {
    this.movimentoSrv.fetch();

    this.categoriaSrv.getAll().subscribe({
      next: (categorie) => {
        this.categorie = categorie;
      },
    });
  }

  applicaFiltri() {
    this.movimentoSrv.fetch({
      categoriaId: this.categoriaId || undefined,
      dataInizio: this.dataInizio || undefined,
      dataFine: this.dataFine || undefined,
    });
  }

  resetFiltri() {
    this.categoriaId = '';
    this.dataInizio = '';
    this.dataFine = '';

    this.movimentoSrv.fetch();
  }
}