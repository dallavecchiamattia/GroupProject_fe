import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const authSrv = inject(AuthService);
  const router = inject(Router);

  if (!authSrv.currentUser()) {
    return router.createUrlTree(['/login'], { queryParams: { dest: state.url }, });
  }

  return true;
}
