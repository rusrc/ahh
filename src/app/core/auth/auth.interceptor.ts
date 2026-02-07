import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

const MOCK_TOKEN = 'mock-jwt-token-ahh-12345';

/**
 * Перехватывает POST /api/auth/login и возвращает захардкоженный JSON с токеном,
 * пока бэкенд не реализован.
 */
export const authMockInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next) => {
  const isLogin =
    req.method === 'POST' &&
    (req.url.endsWith('/api/auth/login') || req.url.includes('auth/login'));

  if (isLogin) {
    return of(
      new HttpResponse({
        status: 200,
        body: { token: MOCK_TOKEN },
      })
    );
  }

  return next(req);
};
