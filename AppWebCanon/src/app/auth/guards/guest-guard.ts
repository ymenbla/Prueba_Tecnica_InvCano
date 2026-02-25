import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth-service';
import { map } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = authService.isAuthenticated();

  const redirectUrlApp = '/app';

  if (typeof isAuth === 'boolean') {
    return isAuth ? router.createUrlTree([redirectUrlApp]) : true;
  }

  return authService.checkSession().pipe(
    map(isAuthenticated =>
      isAuthenticated
        ? router.createUrlTree([redirectUrlApp])
        : true
    )
  );
};
