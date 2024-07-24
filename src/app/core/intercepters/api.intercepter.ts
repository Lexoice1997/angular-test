import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export function APIInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(
    !req.url.match(/assets/)
      ? req.clone({
          url: `${environment.API_URL}/${req.url}`,
        })
      : req
  );
}
