import { Component, inject, OnInit } from '@angular/core';
import { MovimentoService } from '../../services/movimento.service';
import { CategoriaService } from '../../services/categorie.service';
import { Categoria } from '../../entities';
import { FormsModule } from '@angular/forms';
import { MovimentiTabellaComponent } from '../../components/movimenti-tabella/movimenti-tabella.component';
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-lista-movimenti',
  imports: [FormsModule, MovimentiTabellaComponent],
  templateUrl: './lista-movimenti.component.html',
  styleUrl: './lista-movimenti.component.css',
})
export class ListaMovimentiComponent implements OnInit {
  private movimentoSrv = inject(MovimentoService);
  private categoriaSrv = inject(CategoriaService);
  private exportSrv = inject(ExportService);

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


  esportaCSV() {
    this.exportSrv.esportaCSV(this.movimenti());
  }

  async esportaExcel() {
    await this.exportSrv.esportaExcel(this.movimenti());
  }
}