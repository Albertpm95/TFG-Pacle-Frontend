import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpError } from '@constants';
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
            console.log('Angular error', error)
          }
          else {
            switch (error.status) {
              case HttpError.BadRequest:
                console.error('Bad request: ', error.status)
                break;
              case HttpError.Unauthorized:
                console.error('Unauthorized: ', error.status)
                break;
              case 402:
                console.error('Forbidden: ', error.status)
                break;
              case HttpError.Forbidden:
                console.error('Payment required: ', error.status)
                break;
              case HttpError.NotFound:
                console.error('Not found: ', error.status)
                break;
              case 405:
                console.error('Method not allowed: ', error.status)
                break;
              case 406:
                console.error('Not acceptable: ', error.status)
                break;
              case 407:
                console.error('Proxy authentication required: ', error.status)
                break;
              case HttpError.TimeOut:
                console.error('Request timeout: ', error.status)
                break;
              case HttpError.Conflict:
                console.error('Conflict: ', error.status)
                break;
              case 410:
                console.error('Gone: ', error.status)
                break;
              case HttpError.InternalServerError:
                console.error('El servidor no funciona: ', error.status)
                break;
              case 503:
                console.error('Unauthorized: ', error.status)
                break;
              default:
                console.error('Error desconocido.')
                break;
            }
          }
        }
        else {
          console.error('An error ocurred.')
        }
        return throwError(() => { error })
      })
    )
  }
}
