import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { UserAction } from '@models/acciones-usuario';
import { Acta } from '@models/acta';
import { Alumno } from '@models/alumno';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  title = environment.title;
  apiUrl = environment.apiURL;
  listaIdiomasActa: string[] = [];
  tipoActa: string[] = [];

  constructor(private http: HttpClient) {}

  getUserActions(): Observable<UserAction[]> {
    return this.http.get<UserAction[]>(this.apiUrl + 'user/actions');
  }

  getActas(): Observable<Acta[]> {
    return this.http.get<Acta[]>(this.apiUrl + 'actas/list');
  }

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl + 'actas/list');
  }

  getAlumno(
    nombre: string,
    apellidos?: string,
    id_acta?: string
  ): Observable<Alumno> {
    return this.http.get<Alumno>(
      this.apiUrl + 'alumnos/' + { nombre, apellidos, id_acta }
    );
  }

  getIdiomasActa(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + 'actas/idiomas');
  }

  getTiposActa(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + 'actas/tipos');
  }
}
