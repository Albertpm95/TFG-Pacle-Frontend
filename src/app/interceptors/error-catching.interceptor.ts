import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError, timer } from 'rxjs';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry({
        count: 0,
        delay: (_, retryCount) => timer(retryCount * 1000),
      }),
      catchError((error) => {
        console.log('Error interceptado')
        return throwError(() => {
          console.log('Error rethrown')
          return error
        })
      })
    )
  }
}
