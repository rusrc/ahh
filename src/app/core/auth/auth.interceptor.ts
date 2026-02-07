import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

const MOCK_TOKEN_PREFIX = 'mock.';

type LoginRole = 'specialist' | 'hr';

const encodeToken = (payload: { role: LoginRole; email: string }): string => {
  const json = JSON.stringify(payload);
  if (typeof btoa === 'function') return `${MOCK_TOKEN_PREFIX}${btoa(json)}`;
  if (typeof Buffer !== 'undefined') {
    return `${MOCK_TOKEN_PREFIX}${Buffer.from(json, 'utf-8').toString('base64')}`;
  }
  return `${MOCK_TOKEN_PREFIX}${json}`;
};

/**
 * Перехватывает POST /api/auth/login и возвращает захардкоженный JSON с токеном,
 * пока бэкенд не реализован.
 */
export const authMockInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next) => {
  const isLogin =
    req.method === 'POST' &&
    (req.url.endsWith('/api/auth/login') || req.url.includes('auth/login'));

  if (isLogin) {
    const body = req.body as { login?: string } | null;
    const login = body?.login?.trim()?.toLowerCase();
    const role: LoginRole | null =
      login === 'specialist@mail.ru' ? 'specialist' : login === 'hr@mail.ru' ? 'hr' : null;

    return of(
      new HttpResponse({
        status: role ? 200 : 401,
        body: role
          ? { token: encodeToken({ role, email: login! }) }
          : { message: 'Invalid credentials' },
      })
    );
  }

  return next(req);
};
