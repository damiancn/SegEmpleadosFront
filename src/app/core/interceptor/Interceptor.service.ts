import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ServiceResponse } from 'src/app/model/common/service-response';


export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const route = inject(Router);
  const credencialString = localStorage.getItem('credencial');
  const credencial = JSON.parse(credencialString),
    token = credencial?.token;
  let headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  const cloneToken = req.clone({ headers });
  return next(cloneToken).pipe(
    catchError((err) => {
      if ([401, 403].indexOf(err.status) !== -1) {
        window.localStorage.removeItem('credencial');
        route.navigate(['/login']);
      };
      const error = err.error as ServiceResponse<any>;
      return throwError(() => error);
    })
  );

}
