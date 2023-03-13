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
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.log('Error event', error.error)
          }
          else {
            console.log('Error status: ', error)
            switch (error.status) {
              case 401: // Unauthorized
                console.log('Error status: ', error.status)
                break;
              case 402: // Forbidden
                console.log('Error status: ', error.status)
                break;
              case 403: // Payment required
                console.log('Error status: ', error.status)
                break;
              case 404: // Not found
                console.log('Error status: ', error.status)
                break;
              case 405: // Method not allowed
                console.log('Error status: ', error.status)
                break;
              case 406: // Not acceptable
                console.log('Error status: ', error.status)
                break;
              case 407: // Proxy Authentication Required
                console.log('Error status: ', error.status)
                break;
              case 408: // Request timeout
                console.log('Error status: ', error.status)
                break;
              case 409: // Conflict
                console.log('Error status: ', error.status)
                break;
              case 410: // Gone
                console.log('Error status: ', error.status)
                break;
              case 503: // Unauthorized
                console.log('Error status: ', error.status)
                break;
            }
          }
        }
        else {
          console.log('An error ocurred.')
        }
        return throwError(() => { new Error(error.statusText) })
      })
    )
  }
}
