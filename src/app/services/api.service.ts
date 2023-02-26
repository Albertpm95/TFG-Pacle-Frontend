import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { API, Roles, Paths } from '@constants'
import { environment } from '@environments/environment'
import { UserAction } from '@models/acciones-usuario'
import { Acta } from '@models/acta'
import { Alumno } from '@models/alumno'
import { Convocatoria } from '@models/convocatoria'
import { Rol } from '@models/rol'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  apiUrl = environment.apiURL

  constructor(private http: HttpClient) { }

  /** Admin */
  subirFicheroExcel(excel: File) {
    return this.http.post<File>(this.apiUrl + API.ALUMNO_UPLOAD_EXCEL, excel)
  }
  getRolesUsuario(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl + API.USUARIO_ROLES)
  }
  /** ---------------------------------------------------------------------- */

  /** Convocatorias */
  getConvocatorias(): Observable<Convocatoria[]> {
    console.log('API Call Get Actas')
    return this.http.get<Convocatoria[]>(this.apiUrl + API.CONVOCATORIA_LIST)
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
  getActa(idActa: number): Observable<Acta> {
    console.log('API Call Get Acta ID', idActa)
    return this.http.get<Acta>(this.apiUrl + API.ACTA_CORRECT + '/' + idActa)
  }
  /** ---------------------------------------------------------------------- */

  /** Actas */
  getActas(): Observable<Acta[]> {
    console.log('API Call Get Actas')
    return this.http.get<Acta[]>(this.apiUrl + API.ACTA_LIST)
  }
  updateComprensionLectora(): Observable<boolean> {
    throw new Error('Method not implemented.')
  }
  updateExpresionEscrita(): Observable<boolean> {
    throw new Error('Method not implemented.')
  }
  updateComprensionAuditiva(): Observable<boolean> {
    throw new Error('Method not implemented.')
  }
  updateExpresionOral(): Observable<boolean> {
    throw new Error('Method not implemented.')
  }
  /** ---------------------------------------------------------------------- */

  /** Alumnos */
  getAlumnos(): Observable<Alumno[]> {
    console.log('API Call Get Alumnos')
    return this.http.get<Alumno[]>(this.apiUrl + API.ALUMNO_LIST)
  }
  searchAlumno(nombre: string, apellidos?: string, id_acta?: string): Observable<Alumno> {
    console.log('API Call search Alumno', nombre, apellidos, id_acta)
    return this.http.get<Alumno>(
      this.apiUrl + Paths.ALUMNO + { nombre, apellidos, id_acta } // TODO Roles no es adecuado para la ruta, actualizar
    )
  }
  /** ---------------------------------------------------------------------- */
}
