import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@environments/environment'

import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  title = environment.title
  apiUrl = environment.apiURL

  constructor(private http: HttpClient) {}

  login(usuario: FormData): Observable<any> {
    console.log('API Call Login ', usuario)
    return this.http.post<FormData>(this.apiUrl + 'login', usuario)
  }
}
