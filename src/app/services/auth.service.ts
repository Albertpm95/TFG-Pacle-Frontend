import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  title = environment.title;
  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  login(user: Usuario): Observable<any> {
    console.log('API Call Login ', user);
    return this.http.post<any>(this.apiUrl + 'login', user);
  }
}
