import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { environment as env } from '@environments/environment';
import { Router } from '@angular/router';

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);
  const router = inject(Router)

  return next(req).pipe(
    catchError(error => {

      if (error.status === 401) {

        return http.post(`${env.API_URL}/auth/refresh`, {}, {
          withCredentials: true
        }).pipe(
          switchMap(() => {
            return next(req); // Reintenta la request original
          }),
          catchError(err => {
            // Si refresh falla → logout
            router.navigate(['/auth/login']);
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
