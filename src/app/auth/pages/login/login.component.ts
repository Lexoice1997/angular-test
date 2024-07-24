import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginPageComponent {
  public login = '';
  public password = '';

  constructor(private authService: AuthService) {
    console.log('login: azamat@gmail.com');
    console.log('password: 12345');
  }

  onChangeLogin(event: Event) {
    const target = event.target as HTMLInputElement;
    this.login = target.value;
  }

  onChangePassword(event: Event) {
    const target = event.target as HTMLInputElement;
    this.password = target.value;
  }

  onSubmit() {
    this.authService.login(this.login, this.password);
  }
}
