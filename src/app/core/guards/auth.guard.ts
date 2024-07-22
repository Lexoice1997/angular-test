import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): MaybeAsync<GuardResult> {
    if (localStorage.getItem('isAuth') === '1') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
