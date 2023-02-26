import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { API_ENDPOINTS, Routers } from '@constants'
import { environment } from '@environments/environment'
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
    return this.http.post<File>(this.apiUrl + API_ENDPOINTS.ALUMNO_UPLOAD_EXCEL, excel)
  }
  getRolesUsuario(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl + API_ENDPOINTS.USUARIO_ROLES)
  }
  /** ---------------------------------------------------------------------- */

  /** Convocatorias */
  getConvocatorias(): Observable<Convocatoria[]> {
    console.log('API_ENDPOINTS Call Get Actas')
    return this.http.get<Convocatoria[]>(this.apiUrl + API_ENDPOINTS.CONVOCATORIA_LIST)
  }
  getIdiomasActa(): Observable<string[]> {
    console.log('API_ENDPOINTS Call Get Idiomas')
    return this.http.get<string[]>(this.apiUrl + API_ENDPOINTS.ACTA_IDIOMAS)
  }
  getHorariosActa(): Observable<string[]> {
    console.log('API_ENDPOINTS Call Get Horarios')
    return this.http.get<string[]>(this.apiUrl + API_ENDPOINTS.ACTA_HORARIOS)
  }
  getTiposActa(): Observable<string[]> {
    console.log('API_ENDPOINTS Call Get Tipos')
    return this.http.get<string[]>(this.apiUrl + API_ENDPOINTS.ACTA_TIPOS)
  }
  getActa(idActa: number): Observable<Acta> {
    console.log('API_ENDPOINTS Call Get Acta ID', idActa)
    return this.http.get<Acta>(this.apiUrl + API_ENDPOINTS.ACTA_EDIT + '/' + idActa)
  }
  /** ---------------------------------------------------------------------- */

  /** Actas */
  getActas(): Observable<Acta[]> {
    console.log('API_ENDPOINTS Call Get Actas')
    return this.http.get<Acta[]>(this.apiUrl + API_ENDPOINTS.ACTA_LIST)
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
    console.log('API_ENDPOINTS Call Get Alumnos')
    return this.http.get<Alumno[]>(this.apiUrl + API_ENDPOINTS.ALUMNO_LIST)
  }
  searchAlumno(nombre: string, apellidos?: string, id_acta?: string): Observable<Alumno> {
    console.log('API_ENDPOINTS Call search Alumno', nombre, apellidos, id_acta)
    return this.http.get<Alumno>(
      this.apiUrl + Routers.ALUMNO + { nombre, apellidos, id_acta } // TODO Roles no es adecuado para la ruta, actualizar
    )
  }
  /** ---------------------------------------------------------------------- */
}
