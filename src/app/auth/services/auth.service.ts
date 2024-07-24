import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

const LOGIN = 'azamat@gmail.com';
const PASSWORD = '12345';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public isLogged = signal<boolean>(false);
  TOKEN = 'hello my friends';

  constructor(private router: Router) {}

  isLogging() {
    if (this.isLogged()) {
      return true;
    }
    return false;
  }

  login(login: string, password: string) {
    if (login === LOGIN && password === PASSWORD) {
      localStorage.setItem('isAuth', '1');
      this.isLogged.set(true);
      this.router.navigate(['/home']);
    }
  }

  logout() {
    localStorage.removeItem('isAuth');
    this.isLogged.set(false);
    this.router.navigate(['/login']);
  }

  getToken() {
    return this.TOKEN;
  }
}
