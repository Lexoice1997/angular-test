import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth/services/auth.service';

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const token = inject(AuthService).getToken();
  let authReq = req;

  if (token) {
    authReq = authReq.clone({
      // headers: authReq.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  return next(authReq);
}
