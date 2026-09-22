import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-cambio-password-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cambio-password-modal.component.html',
  styleUrl: './cambio-password-modal.component.css'
})
export class CambioPasswordModalComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  activeModal = inject(NgbActiveModal); // pubblico: serve nel template

  errore = signal<string | null>(null);
  inCorso = signal(false);

  form = this.fb.nonNullable.group({
    vecchiaPassword: ['', Validators.required],
    nuovaPassword: ['', [Validators.required, Validators.minLength(8)]],
    confermaNuovaPassword: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) return;
    this.inCorso.set(true);
    this.userService.changePassword(this.form.getRawValue()).subscribe({
      next: () => {
        this.inCorso.set(false);
        this.activeModal.close(); // equivalente al vecchio salvato.emit()
      },
      error: (err) => {
        this.inCorso.set(false);
        this.errore.set(err.error?.message ?? 'Errore durante il cambio password');
      }
    });
  }
  // onAnnulla() non serve più: nel template si chiama activeModal.dismiss()
}