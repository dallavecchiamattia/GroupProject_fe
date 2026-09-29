import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError, of, Subject, throwError, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

const LOGIN_TIMEOUT_MS = 30_000;
const EMAIL_NOT_CONFIRMED = 'email not confirmed';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected fb = inject(FormBuilder);
  protected authSrv = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', { validators: [Validators.required] }],
    password: ['', { validators: [Validators.required] }]
  });

  errorMessage = signal<string | null>(null);
  emailNotConfirmed = computed(() => this.errorMessage() === EMAIL_NOT_CONFIRMED);
  resendSent = signal(false);

  ngOnInit() {
    this.loginForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.errorMessage.set(null);
        this.resendSent.set(false);
      })

    timer(LOGIN_TIMEOUT_MS)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loginForm.reset();
        this.errorMessage.set('Hai impiegato troppo tempo per effettuare il login. Riprova.');
      });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authSrv.login(email!, password!)
        .pipe(
          catchError(response => {
            const message = response.error.message;
            this.errorMessage.set(message);
            return throwError(() => response);
          })
        )
        .subscribe(() => {
          this.router.navigate(['/home']);
        });
    }
  }

  resendConfirmation() {
    this.authSrv.resendConfirmation(this.loginForm.value.email!)
      .subscribe({
        next: () => this.resendSent.set(true),
        error: response => this.errorMessage.set(response.error.message)
      });
  }
}