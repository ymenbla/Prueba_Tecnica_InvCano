import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { RegisterRequest, LoginRequest } from '@auth/index';
import { environment as env } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

private http = inject(HttpClient);

  private _isAuthenticated = signal(false);
  isAuthenticated = this._isAuthenticated.asReadonly();

  private baseUrl = `${env.API_URL}/auth`;

  // =========================
  // REGISTER
  // =========================
  register(data: RegisterRequest) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // =========================
  // LOGIN
  // =========================
  login(data: LoginRequest) {
    return this.http.post(`${this.baseUrl}/login`, data)
      .pipe(
        tap(() => this._isAuthenticated.set(true))
      );
  }

  // =========================
  // CHECK SESSION
  // =========================
  checkSession() {
    return this.http.get(`${this.baseUrl}/me`).pipe(
    map(() => {
      this._isAuthenticated.set(true);
      return true;
    }),
    catchError(() => {
      this._isAuthenticated.set(false);
      return of(false);
    })
  );
  }

  // =========================
  // REFRESH TOKEN
  // =========================
  refresh() {
    return this.http.post(`${this.baseUrl}/refresh`, {});
  }

  // =========================
  // LOGOUT
  // =========================
  logout() {
    return this.http.post(`${this.baseUrl}/logout`, {})
      .pipe(
        tap(() => this._isAuthenticated.set(false))
      );
  }

  // =========================
  // SYNC ACCESS (GUARD)
  // =========================
  isAuthenticatedSync(): boolean {
    return this._isAuthenticated();
  }
}
