import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export function roleGuard(requiredRoles: string[]): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isLoggedIn()) {
      // nicht eingeloggt → Login starten
      auth.initLoginFlow();
      return false;
    }

    const hasRole = requiredRoles.some(role => auth.hasRole(role));
    if (hasRole) {
      return true;
    }

    // eingeloggt, aber keine passende Rolle → Forbidden-Seite oder Startseite
    router.navigate(['/forbidden']);
    return false;
  };
}
