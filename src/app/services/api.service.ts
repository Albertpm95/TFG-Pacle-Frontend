import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { UserAction } from '@models/acciones-usuario';
import { Acta } from '@models/acta';
import { Alumno } from '@models/alumno';
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
    return this.http.get<UserAction[]>(this.apiUrl + 'user/actions')
  }

  getActas(): Observable<Acta[]> {
    return this.http.get<Acta[]>(this.apiUrl + 'acta/list')
  }

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl + 'acta/list')
  }

  getAlumno(nombre: string, apellidos?: string, id_acta?: string): Observable<Alumno> {
    return this.http.get<Alumno>(this.apiUrl + 'alumno' + { nombre, apellidos, id_acta })
  }
}
