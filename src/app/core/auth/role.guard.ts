import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService, UserRole } from './auth.service';

export const roleGuard: CanMatchFn = (route) => {
  const roles = route.data?.['roles'] as UserRole[] | undefined;
  if (!roles || roles.length === 0) return true;

  const auth = inject(AuthService);
  if (auth.role() && roles.includes(auth.role() as UserRole)) {
    return true;
  }

  const router = inject(Router);
  return router.createUrlTree(['/']);
};
