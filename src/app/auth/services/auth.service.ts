import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

const LOGIN = 'azamat@gmail.com';
const PASSWORD = 'Azamat@1997';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private TOKEN = 'hello my friends';
  public isLogged = signal<boolean>(false);

  constructor(private router: Router) {}

  public isLogging() {
    if (this.isLogged()) {
      return true;
    }
    return false;
  }

  public login(login: string, password: string) {
    if (login === LOGIN && password === PASSWORD) {
      localStorage.setItem('isAuth', '1');
      this.isLogged.set(true);
      this.router.navigate(['/home']);
    }
  }

  public logout() {
    localStorage.removeItem('isAuth');
    this.isLogged.set(false);
    this.router.navigate(['/login']);
  }

  public getToken() {
    return this.TOKEN;
  }
}
