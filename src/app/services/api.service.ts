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
  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  /**  Usuarios */
  getUserActions(): Observable<UserAction[]> {
    console.log('API Call Get User Actions');
    return this.http.get<UserAction[]>(
      this.apiUrl + Constants.USUARIO_ACCIONES
    );
  }
  /** ---------------------------------------------------------------------- */

  /** Admin */
  subirFicheroExcel(excel: File) {
    return this.http.post<File>(
      this.apiUrl + Constants.ADMIN_UPLOAD_FILE,
      excel
    );
  }
  /** ---------------------------------------------------------------------- */

  /** Actas */
  getActas(): Observable<Acta[]> {
    console.log('API Call Get Actas');
    return this.http.get<Acta[]>(this.apiUrl + Constants.ACTA_LIST);
  }
  getIdiomasActa(): Observable<string[]> {
    console.log('API Call Get Idiomas');
    return this.http.get<string[]>(this.apiUrl + Constants.ACTA_IDIOMAS);
  }
  getTiposActa(): Observable<string[]> {
    console.log('API Call Get Tipos');
    return this.http.get<string[]>(this.apiUrl + Constants.ACTA_TIPOS);
  }
  /** ---------------------------------------------------------------------- */

  /** Alumnos */
  getAlumnos(): Observable<Alumno[]> {
    console.log('API Call Get Alumnos');
    return this.http.get<Alumno[]>(this.apiUrl + Constants.ALUMNO_LIST);
  }
  getAlumno(
    nombre: string,
    apellidos?: string,
    id_acta?: string
  ): Observable<Alumno> {
    console.log('API Call Get Alumno');
    return this.http.get<Alumno>(
      this.apiUrl + Constants.ALUMNO + { nombre, apellidos, id_acta }
    );
  }
  /** ---------------------------------------------------------------------- */
}
