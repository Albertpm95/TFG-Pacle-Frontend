import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { API_ENDPOINTS, Routers } from '@constants'
import { environment } from '@environments/environment'
import { Acta } from '@models/acta'
import { Alumno } from '@models/alumno'
import { Convocatoria } from '@models/convocatoria'
import { Horario } from '@models/horario'
import { Idioma } from '@models/idioma'
import { Rol } from '@models/rol'
import { Tipo } from '@models/tipo'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiURL

  constructor(private http: HttpClient) { }

  /** Admin */
  subirFicheroExcel(excel: File) {
    return this.http.post<File>(
      this.apiUrl + API_ENDPOINTS.ALUMNO_UPLOAD_EXCEL,
      excel,
    )
  }
  getRolesUsuario(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl + API_ENDPOINTS.USUARIO_ROLES)
  }
  /** ---------------------------------------------------------------------- */

  /** Convocatorias */
  getConvocatorias(): Observable<Convocatoria[]> {
    return this.http.get<Convocatoria[]>(
      this.apiUrl + API_ENDPOINTS.CONVOCATORIAS_LIST,
    )
  }
  getConvocatoria(idConvocatoria: number): Observable<Convocatoria> {
    return this.http.get<Convocatoria>(
      this.apiUrl + API_ENDPOINTS.CONVOCATORIA_EDIT + '/' + idConvocatoria,
    )
  }
  cambiarEstadoConvocatoria(id_convocatoria: number, estado_nuevo: boolean) {
    return this.http.patch<Convocatoria>(this.apiUrl, {
      id_convocatoria,
      estado_nuevo,
    })
  }
  /** ---------------------------------------------------------------------- */

  /** Configuracion */
  getTiposConvocatoria(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.apiUrl + API_ENDPOINTS.CONFIG_TIPOS)
  }
  addTipoConvocatoria(tipo: string): Observable<Tipo> {
    return this.http.put<Tipo>(this.apiUrl + '/config/tipos/create', { tipo })
  }
  deleteTipoConvocatoria(idTipo: number): Observable<Tipo> {
    return this.http.delete<Tipo>(this.apiUrl + '/config/tipos/delete' + idTipo)
  }
  getHorariosConvocatoria(): Observable<Horario[]> {
    return this.http.get<Horario[]>(
      this.apiUrl + API_ENDPOINTS.CONFIG_HORARIOS,
    )
  }
  addHorarioConvocatoria(horario: string): Observable<Horario> {
    return this.http.put<Horario>(this.apiUrl + '/config/horarios/create', { horario })
  }
  deleteHorarioConvocatoria(idHorario: number): Observable<Horario> {
    return this.http.delete<Horario>(this.apiUrl + '/config/horarios/delete' + idHorario)
  }
  getIdiomasConvocatoria(): Observable<Idioma[]> {
    return this.http.get<Idioma[]>(
      this.apiUrl + API_ENDPOINTS.CONFIG_IDIOMAS,
    )
  }
  addIdiomaConvocatoria(idioma: string): Observable<Idioma> {
    return this.http.put<Idioma>(this.apiUrl + '/config/idiomas/create', { idioma })
  }
  deleteIdiomaConvocatoria(idIdioma: number): Observable<Tipo> {
    return this.http.delete<Tipo>(this.apiUrl + '/config/idioma/delete' + idIdioma)
  }
  /** ---------------------------------------------------------------------- */

  /** Actas */
  getActas(): Observable<Acta[]> {
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
    return this.http.get<Alumno[]>(this.apiUrl + API_ENDPOINTS.ALUMNOS_LIST)
  }
  searchAlumno(
    nombre: string,
    apellidos?: string,
    id_acta?: string,
  ): Observable<Alumno> {
    return this.http.get<Alumno>(
      this.apiUrl + Routers.ALUMNO + { nombre, apellidos, id_acta },
    )
  }
  /** ---------------------------------------------------------------------- */
}
