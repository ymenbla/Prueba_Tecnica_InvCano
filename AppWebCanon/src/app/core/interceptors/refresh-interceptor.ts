import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@auth/index';

let isRefreshing = false;
let refreshFailed = false;
let refreshTokenSubject = new BehaviorSubject<boolean | null>(null);

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router)

    return next(req).pipe(

    catchError(error => {

      if (
        req.url.includes('/auth/refresh')
      ) {
        return throwError(() => error);
      }

      if (error.status !== 401) {
        return throwError(() => error);
      }

      // si el refresh token ha fallado, redirigir al login
      if (refreshFailed) {
        router.navigate(['/auth/login']);
        return throwError(() => error);
      }

      // Si ya hay refresh en progreso
      if (isRefreshing) {

        return refreshTokenSubject.pipe(
          filter(result => result === true),
          take(1),
          switchMap(() => next(req.clone()))
        );

      }

      isRefreshing = true;
      refreshTokenSubject.next(null);

      return authService.refreshSession().pipe(
        switchMap(() => {

          isRefreshing = false;
          refreshTokenSubject.next(true);
          return next(req.clone());

        }),
        catchError(err => {

          isRefreshing = false;
          router.navigate(['/auth/login']);
          return throwError(() => err);

        })

      );

    })

  );
};
