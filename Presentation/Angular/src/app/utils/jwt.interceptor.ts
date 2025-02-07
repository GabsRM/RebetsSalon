import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { AuthService } from '../api';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { token } = this.authService.currentUser || {};

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (
          (err.status === 401 || err.status === 402 || err.status === 0) &&
          this.authService.currentUser
        ) {
          console.error('Se ha cerrado sesión automáticamente');
          this.authService.logout();
        }

        if (err.status === 403) {
          this.router.navigateByUrl('/error/403');
        }

        throw err;
      })
    );
  }
}
