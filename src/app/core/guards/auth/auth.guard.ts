import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../../../data/services/auth/auth.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated$.value) {
    return true;
  }

  return authService.verifyToken().pipe(
    map((isValid) => {
      if (isValid.isValid) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
