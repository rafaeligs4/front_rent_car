import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authS: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authS.getToken();
    if(token){
      const cloned = request.clone({
        headers: request.headers.set(`Authorization`,`Bearer ${token}`)
      })
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
