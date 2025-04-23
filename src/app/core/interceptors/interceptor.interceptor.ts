import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const modifiedRequest = req.clone({
    withCredentials: true
  });
  return next(modifiedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        alert(error.error?.message)
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
