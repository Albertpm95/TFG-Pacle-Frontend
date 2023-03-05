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
    console.log('API_ENDPOINTS Call upload file')
    return this.http.post<File>(this.apiUrl + API_ENDPOINTS.ALUMNO_UPLOAD_EXCEL, excel)
  }
  getRolesUsuario(): Observable<Rol[]> {
    console.log('API_ENDPOINTS Call Get Roles')
    return this.http.get<Rol[]>(this.apiUrl + API_ENDPOINTS.USUARIO_ROLES)
  }
  /** ---------------------------------------------------------------------- */

  /** Convocatorias */
  getConvocatorias(): Observable<Convocatoria[]> {
    console.log('API_ENDPOINTS Call Get Convocatorias')
    return this.http.get<Convocatoria[]>(this.apiUrl + API_ENDPOINTS.CONVOCATORIAS_LIST)
  }
  getIdiomasConvocatoria(): Observable<string[]> {
    console.log('API_ENDPOINTS Call Get Idiomas')
    return this.http.get<string[]>(this.apiUrl + API_ENDPOINTS.CONVOCATORIA_IDIOMAS)
  }
  getHorariosConvocatoria(): Observable<string[]> {
    console.log('API_ENDPOINTS Call Get Horarios')
    return this.http.get<string[]>(this.apiUrl + API_ENDPOINTS.CONVOCATORIA_HORARIOS)
  }
  getTiposConvocatoria(): Observable<string[]> {
    console.log('API_ENDPOINTS Call Get Tipos')
    return this.http.get<string[]>(this.apiUrl + API_ENDPOINTS.CONVOCATORIA_TIPOS)
  }
  getConvocatoria(idConvocatoria: number): Observable<Convocatoria> {
    console.log('API_ENDPOINTS Call Get Convocatoria ID', idConvocatoria)
    return this.http.get<Convocatoria>(this.apiUrl + API_ENDPOINTS.CONVOCATORIA_EDIT + '/' + idConvocatoria)
  }
  cambiarEstadoConvocatoria(id_convocatoria: number, estado_nuevo: boolean) {
    console.log('API_ENDPOINTS Call Patch cambiar estado convocatoria', { id_convocatoria, estado_nuevo })
    return this.http.patch<Convocatoria>(this.apiUrl, { id_convocatoria, estado_nuevo })
  }
  /** ---------------------------------------------------------------------- */

  /** Actas */
  getActas(): Observable<Acta[]> {
    console.log('API_ENDPOINTS Call Get Actas')
    return this.http.get<Acta[]>(this.apiUrl + API_ENDPOINTS.ACTAS_LIST)
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
    return this.http.get<Alumno[]>(this.apiUrl + API_ENDPOINTS.ALUMNOS_LIST)
  }
  searchAlumno(nombre: string, apellidos?: string, id_acta?: string): Observable<Alumno> {
    console.log('API_ENDPOINTS Call search Alumno', nombre, apellidos, id_acta)
    return this.http.get<Alumno>(
      this.apiUrl + Routers.ALUMNO + { nombre, apellidos, id_acta }
    )
  }
  /** ---------------------------------------------------------------------- */
}
