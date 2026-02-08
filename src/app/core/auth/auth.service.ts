import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';

const AUTH_API = '/api/auth/login';
const TOKEN_KEY = 'ahh_token';

export type UserRole = 'specialist' | 'hr';

export interface AuthTokenPayload {
  role: UserRole;
  email?: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private tokenSignal = signal<string | null>(null);

  readonly isLoggedIn = computed(() => !!this.tokenSignal());
  readonly token = this.tokenSignal.asReadonly();
  readonly role = computed(() => this.parseToken(this.tokenSignal())?.role ?? null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.tokenSignal.set(this.getStoredToken());
    }
  }

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
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  isRole(role: UserRole): boolean {
    return this.role() === role;
  }

  private storeToken(token: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(TOKEN_KEY, token);
  }

  private parseToken(token: string | null): AuthTokenPayload | null {
    if (!token) return null;
    const raw = token.startsWith('mock.') ? token.slice(5) : token;
    const decoded = this.tryBase64Decode(raw);
    try {
      return JSON.parse(decoded) as AuthTokenPayload;
    } catch {
      return null;
    }
  }

  private tryBase64Decode(value: string): string {
    try {
      if (typeof atob === 'function') {
        return atob(value);
      }
      if (typeof Buffer !== 'undefined') {
        return Buffer.from(value, 'base64').toString('utf-8');
      }
    } catch {
      return value;
    }
    return value;
  }
}
