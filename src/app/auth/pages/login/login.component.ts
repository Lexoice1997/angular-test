import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { strongPasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginPageComponent {
  private formBuilder = inject(FormBuilder);
  public loginForm: FormGroup;

  constructor(private authService: AuthService) {
    console.log('login: azamat@gmail.com');
    console.log('password: Azamat@1997');
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, strongPasswordValidator()]],
    });
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(
        this.loginForm.value.login,
        this.loginForm.value.password
      );
    }
  }
}
