import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { UserAction } from '@models/acciones-usuario';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  title = environment.title;
  apiUrl = environment.apiURL

  constructor(private http: HttpClient) { }

  getUserActions(): Observable<UserAction[]> {
    return this.http.get<UserAction[]>(this.apiUrl + 'user_actions')
  }
}
