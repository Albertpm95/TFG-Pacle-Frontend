import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@environments/environment'

import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiURL

  constructor(private http: HttpClient) { }

  login(usuario: FormData): Observable<any> {
    return this.http.post<FormData>(this.apiUrl + 'login', usuario)
  }
}
