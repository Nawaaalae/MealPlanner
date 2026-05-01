import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth0 = inject(AuthService);

  const customToken = localStorage.getItem('token');

  if (customToken) {
    return true;
  }

  return auth0.isAuthenticated$.pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      }

      router.navigate(['/login']);
      return false;
    })
  );
};