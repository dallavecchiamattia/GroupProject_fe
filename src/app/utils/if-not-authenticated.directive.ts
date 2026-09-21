import { Directive, effect, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[ifNotAuthenticated]',
  standalone: true
})
export class IfNotAuthenticatedDirective {
  private authSrv = inject(AuthService);
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      // Mostra l'elemento solo se NON è autenticato
      if (!this.authSrv.isAuthenticated()) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}