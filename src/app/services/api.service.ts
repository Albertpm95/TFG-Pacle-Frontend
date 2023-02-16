import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { API, Roles } from '@constants'
import { environment } from '@environments/environment'
import { UserAction } from '@models/acciones-usuario'
import { Acta } from '@models/acta'
import { Alumno } from '@models/alumno'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiURL

  constructor(private http: HttpClient) {}

  /**  Usuarios */
  getUserActions(): Observable<UserAction[]> {
    console.log('API Call Get User Actions', this.apiUrl + API.USUARIO_ACCIONES)
    return this.http.get<UserAction[]>(this.apiUrl + API.USUARIO_ACCIONES)
  }
  /** ---------------------------------------------------------------------- */

  /** Admin */
  subirFicheroExcel(excel: File) {
    return this.http.post<File>(this.apiUrl + API.ALUMNO_UPLOAD_EXCEL, excel)
  }
  /** ---------------------------------------------------------------------- */

  /** Actas */
  getActas(): Observable<Acta[]> {
    console.log('API Call Get Actas')
    return this.http.get<Acta[]>(this.apiUrl + API.ACTA_LIST)
  }
  getIdiomasActa(): Observable<string[]> {
    console.log('API Call Get Idiomas')
    return this.http.get<string[]>(this.apiUrl + API.ACTA_IDIOMAS)
  }
  getHorariosActa(): Observable<string[]> {
    console.log('API Call Get Horarios')
    return this.http.get<string[]>(this.apiUrl + API.ACTA_HORARIOS)
  }
  getTiposActa(): Observable<string[]> {
    console.log('API Call Get Tipos')
    return this.http.get<string[]>(this.apiUrl + API.ACTA_TIPOS)
  }
  getActa(id: string): Observable<Acta> {
    console.log('API Call Get Acta ID', id)
    return this.http.get<Acta>(this.apiUrl + API.ACTA_CORRECT + '/' + id)
  }
  /** ---------------------------------------------------------------------- */

  /** Alumnos */
  getAlumnos(): Observable<Alumno[]> {
    console.log('API Call Get Alumnos')
    return this.http.get<Alumno[]>(this.apiUrl + API.ALUMNO_LIST)
  }
  getAlumno(
    nombre: string,
    apellidos?: string,
    id_acta?: string,
  ): Observable<Alumno> {
    console.log('API Call Get Alumno')
    return this.http.get<Alumno>(
      this.apiUrl + Roles.ALUMNO + { nombre, apellidos, id_acta }, // TODO Roles no es adecuado para la ruta, actualizar
    )
  }
  /** ---------------------------------------------------------------------- */
}
