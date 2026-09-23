import { Directive, effect, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[ifAuthenticated]',
  standalone: true,
})
export class IfAuthenticatedDirective {
  private templateRef = inject(TemplateRef<any>);
  private vcr = inject(ViewContainerRef);
  private authService = inject(AuthService);

  constructor() {
    effect(() => {
      const isAuth = this.authService.isAuthenticated();

      this.vcr.clear();
      if (isAuth) {
        this.vcr.createEmbeddedView(this.templateRef);
      }
    });
  }
}