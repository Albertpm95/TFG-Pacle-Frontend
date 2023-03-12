import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      //      retry({        count: 0,        delay: (_, retryCount) => timer(retryCount * 1000),      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) { }
        else {
          console.log('An error ocurred.')
        }
        return throwError(() => {
          return new error(error.statusText)
        })
      })
    )
  }
}
