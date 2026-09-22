import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Movimento } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class MovimentoService {
  private http = inject(HttpClient);
  private internal = signal<Movimento[]>([]);

  movimenti = computed(() =>
    [...this.internal()].sort(
      (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
    )
  );

  constructor() {
    this.fetch();
  }

  fetch() {
    this.http.get<Movimento[]>('/api/movimenti',).subscribe(items => {
      this.internal.set(items);
    })
  }

  getById(id: string) {
    return this.http.get<Movimento>(`/api/movimenti/${id}`);
  }
}
