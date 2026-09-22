import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { CambioPasswordModalComponent } from './cambio-password-modal/cambio-password-modal.component';

@Component({
  selector: 'app-profilo',
  imports: [AsyncPipe, DatePipe, RouterLink], // niente più CambioPasswordModalComponent qui
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css',
})
export class ProfiloComponent {
  private userSrv = inject(UserService);
  private modalService = inject(NgbModal);

  profilo$ = this.userSrv.getProfilo();

  apriModalePassword() {
    const modalRef = this.modalService.open(CambioPasswordModalComponent);

    modalRef.result.then(
      () => {
        // chiuso con close() -> password cambiata con successo
      },
      () => {
        // dismiss -> annullato, non fare nulla
      }
    );
  }
}