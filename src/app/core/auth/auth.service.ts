import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';

const AUTH_API = '/api/auth/login';
const TOKEN_KEY = 'ahh_token';

export interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSignal = signal<string | null>(this.getStoredToken());

  readonly isLoggedIn = computed(() => !!this.tokenSignal());
  readonly token = this.tokenSignal.asReadonly();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(login: string, password: string) {
    return this.http.post<LoginResponse>(AUTH_API, { login, password }).pipe(
      tap((res) => {
        if (res?.token) {
          this.storeToken(res.token);
          this.tokenSignal.set(res.token);
        }
      }),
      catchError((err) => {
        console.error('Login failed', err);
        return of(null);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.tokenSignal.set(null);
    this.router.navigate(['/login']);
  }

  getStoredToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  private storeToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }
}
