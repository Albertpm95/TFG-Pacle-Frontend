import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '@constants';
import { environment } from '@environments/environment';
import { UserAction } from '@models/acciones-usuario';
import { Acta } from '@models/acta';
import { Alumno } from '@models/alumno';
import { Observable } from 'rxjs';

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
    return this.http.get<UserAction[]>(
      this.apiUrl + Constants.USUARIO_ACCIONES
    );
  }

  getActas(): Observable<Acta[]> {
    return this.http.get<Acta[]>(this.apiUrl + Constants.ACTA_LIST);
  }

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl + Constants.ALUMNO_LIST);
  }

  getAlumno(
    nombre: string,
    apellidos?: string,
    id_acta?: string
  ): Observable<Alumno> {
    return this.http.get<Alumno>(
      this.apiUrl + Constants.ALUMNO + { nombre, apellidos, id_acta }
    );
  }

  getIdiomasActa(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + Constants.ACTA_IDIOMAS);
  }

  getTiposActa(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + Constants.ACTA_TIPOS);
  }
}
