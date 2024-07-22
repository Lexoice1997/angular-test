import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

const LOGIN = 'azamat';
const PASSWORD = '12345';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  login(login: string, password: string) {
    if (login === LOGIN && password === PASSWORD) {
      localStorage.setItem('isAuth', '1');
      this.router.navigate(['/home']);
    }
  }

  logout() {
    localStorage.removeItem('isAuth');
    this.router.navigate(['/login']);
  }
}
