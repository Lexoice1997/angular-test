import { Injectable, inject } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  authService = inject(AuthService);
  constructor(private router: Router) {}

  canActivate(): MaybeAsync<GuardResult> {
    if (localStorage.getItem('isAuth') === '1') {
      this.authService.isLogged.set(true);
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
