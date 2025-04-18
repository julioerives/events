import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router: Router = inject(Router);
    const hasToken = document.cookie.includes('token=');
    if (!hasToken) {
      router.navigate(['/login']);
      return false;
    }
    return true;
};
