import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Movimento } from '../entities';

export interface MovimentiResponse {
  movimenti: Movimento[];
  saldoFinale?: number;
}

export interface MovimentoFilters {
  categoriaId?: string;
  dataInizio?: string;
  dataFine?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovimentoService {
  private http = inject(HttpClient);

  private readonly internal = signal<Movimento[]>([]);

  readonly movimenti = computed(() =>
    [...this.internal()].sort(
      (a, b) =>
        new Date(b.data).getTime() -
        new Date(a.data).getTime()
    )
  );

  fetch(filters?: MovimentoFilters) {
    let params = new HttpParams();

    if (filters?.categoriaId) {
      params = params.set('categoriaId', filters.categoriaId);
    }

    if (filters?.dataInizio) {
      params = params.set('dataInizio', filters.dataInizio);
    }

    if (filters?.dataFine) {
      params = params.set('dataFine', filters.dataFine);
    }

    this.http
      .get<MovimentiResponse>('/api/movimenti', { params })
      .subscribe({
        next: (response) => {
          this.internal.set(response.movimenti);
        },
      });
  }

  getById(id: string) {
    return this.http.get<Movimento>(`/api/movimenti/${id}`);
  }
}