import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

import { Observable, Subject } from 'rxjs';
import { catchError, pluck, share, shareReplay, tap } from 'rxjs/operators';
import { Usuario, UsuarioLogin } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  title = environment.title;
  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  login(usuario: FormData) {
    console.log('API Call Login ', usuario);
    return this.http.post<FormData>(this.apiUrl + 'login', usuario).pipe(catchError(error => { console.log('Login error: ', error); return error; }));
  }
}
