import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  protected fb = inject(FormBuilder);
  protected authSrv = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  registerForm = this.fb.group({
    email: ['', { validators: [Validators.required] }],
    password: ['', { validators: [Validators.required] }],
    confermaPassword: ['', { validators: [Validators.required] }],
    nomeTitolare: ['', { validators: [Validators.required] }],
    cognomeTitolare: ['', { validators: [Validators.required] }]
  });

  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.registerForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.errorMessage.set(null))
  }


  register() {
    if (this.registerForm.valid) {
      const { email, password, confermaPassword, nomeTitolare, cognomeTitolare } = this.registerForm.value;
      this.authSrv.register(email!, password!, confermaPassword!, nomeTitolare!, cognomeTitolare!)
        .pipe(
          catchError(response => {
            const message = response.error.message;
            this.errorMessage.set(message);
            return throwError(() => response);
          })
        )
        .subscribe(() => {
          this.router.navigate(['/login']);
        });
    }
  }
}
