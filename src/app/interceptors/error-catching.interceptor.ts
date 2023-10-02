import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { HttpError } from '@constants'
import { SnackbarService } from '@services/snackbar.service'
import { Observable, catchError, throwError } from 'rxjs'

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor(private _snackbarService: SnackbarService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error(error.error)
          } else {
            switch (error.status) {
              case HttpError.BadRequest:
                this._snackbarService.openSnackBar(error.error.detail, 'Discard')
                break
              case HttpError.Unauthorized:
                this._snackbarService.openSnackBar(error.error.detail, 'Discard')
                //console.error('Unauthorized: ', error.status)
                break
              case 402:
                this._snackbarService.openSnackBar(error.error.detail, 'Discard')
                //console.error('Forbidden: ', error.status)
                break
              case HttpError.Forbidden:
                this._snackbarService.openSnackBar(error.error.detail, 'Discard')
                //console.error('Payment required: ', error.status)
                break
              case HttpError.NotFound:
                this._snackbarService.openSnackBar(error.error.detail, 'Discard')
                //console.error('Not found: ', error.status)
                break
              case 405:
                this._snackbarService.openSnackBar(error.error.detail, 'Discard')
                //console.error('Method not allowed: ', error.status)
                break
              case 406:
                this._snackbarService.openSnackBar(error.error.detail, 'Discard')
                //console.error('Not acceptable: ', error.status)
                break
              case 407:
                this._snackbarService.openSnackBar(error.error.detail, 'Discard')
                //console.error('Proxy authentication required: ', error.status)
                break
              case HttpError.TimeOut:
                this._snackbarService.openSnackBar(error.error.detail, 'Discard')
                //console.error('Request timeout: ', error.status)
                break
              case HttpError.Conflict:
                this._snackbarService.openSnackBar(error.error.detail, 'Discard')
                //console.error('Conflict: ', error.status)
                break
              case 410:
                this._snackbarService.openSnackBar(error.error.detail, 'Discard')
                //console.error('Gone: ', error.status)
                break
              case HttpError.InternalServerError:
                this._snackbarService.openSnackBar(error.error.detail, 'Discard')
                //console.error('El servidor no funciona: ', error.status)
                break
              case 503:
                this._snackbarService.openSnackBar(error.error.detail, 'Discard')
                //console.error('Unauthorized: ', error.status)
                break
              default:
                this._snackbarService.openSnackBar(error.error.detail, 'Discard')
                //console.error('Error desconocido.')
                break
            }
          }
        } else {
          //console.error('An error ocurred.')
        }
        return throwError(() => {
          error
        })
      })
    )
  }
}
