import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { API_ENDPOINTS, MODULES } from '@constants'
import { environment } from '@environments/environment'
import { Acta } from '@models/acta'
import { Alumno } from '@models/alumno'
import { Comprension } from '@models/comprension'
import { Convocatoria } from '@models/convocatoria'
import { Expresion } from '@models/expresion'
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
      this.apiUrl + API_ENDPOINTS.ADMIN_UPLOAD_ALUMNOS,
      excel,
    )
  }
  getRolesUsuario(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl + API_ENDPOINTS.CONFIG_LIST_ROL)
  }
  /** ---------------------------------------------------------------------- */

  /** Convocatorias */
  getConvocatorias(): Observable<Convocatoria[]> {
    return this.http.get<Convocatoria[]>(
      this.apiUrl + API_ENDPOINTS.CONVOCATORIA_LIST,
    )
  }
  getConvocatoria(idConvocatoria: number): Observable<Convocatoria> {
    return this.http.get<Convocatoria>(
      this.apiUrl + API_ENDPOINTS.CONVOCATORIA_LIST + '/' + idConvocatoria,
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
  getHorariosConvocatoria(): Observable<Horario[]> {
    return this.http.get<Horario[]>(
      this.apiUrl + API_ENDPOINTS.CONFIG_LIST_HORARIO,
    )
  }
  addHorarioConvocatoria(horario: string): Observable<Horario> {
    return this.http.put<Horario>(this.apiUrl + API_ENDPOINTS.CONFIG_CREATE_HORARIO, { horario })
  }
  deleteHorarioConvocatoria(idHorario: number): Observable<Horario> {
    return this.http.delete<Horario>(this.apiUrl + API_ENDPOINTS.CONFIG_DELETE_HORARIO + idHorario)
  }
  getIdiomasConvocatoria(): Observable<Idioma[]> {
    return this.http.get<Idioma[]>(
      this.apiUrl + API_ENDPOINTS.CONFIG_LIST_IDIOMA,
    )
  }
  addIdiomaConvocatoria(idioma: string): Observable<Idioma> {
    return this.http.put<Idioma>(this.apiUrl + API_ENDPOINTS.CONFIG_CREATE_IDIOMA, { idioma })
  }
  deleteIdiomaConvocatoria(idIdioma: number): Observable<Tipo> {
    return this.http.delete<Tipo>(this.apiUrl + API_ENDPOINTS.CONFIG_DELETE_IDIOMA + idIdioma)
  }
  /** ---------------------------------------------------------------------- */

  /** Actas */
  getActas(): Observable<Acta[]> {
    return this.http.get<Acta[]>(this.apiUrl + API_ENDPOINTS.ACTA_LIST)
  }
  getActasID(idActa: number): Observable<Acta> {
    return this.http.get<Acta>(this.apiUrl + API_ENDPOINTS.ACTA_UPDATE + idActa)
  }
  updateComprensionLectora(comprensionLectora: Comprension): Observable<Comprension> {
    return this.http.patch<Comprension>(this.apiUrl + API_ENDPOINTS.EXPRESION_UPDATE, { comprensionLectora })
  }
  updateExpresionEscrita(expresionEscrita: Expresion): Observable<Expresion> {
    return this.http.patch<Expresion>(this.apiUrl + API_ENDPOINTS.EXPRESION_UPDATE, { expresionEscrita })
  }
  updateComprensionAuditiva(comprensionAuditiva: Comprension): Observable<Comprension> {
    return this.http.patch<Comprension>(this.apiUrl + API_ENDPOINTS.EXPRESION_UPDATE, { comprensionAuditiva })
  }
  updateExpresionOral(expresionEscrita: Expresion): Observable<Expresion> {
    return this.http.patch<Expresion>(this.apiUrl + API_ENDPOINTS.EXPRESION_UPDATE, { expresionEscrita })
  }
  /** ---------------------------------------------------------------------- */

  /** Alumnos */
  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl + API_ENDPOINTS.ALUMNO_LIST)
  }
  searchAlumno(
    nombre: string,
    apellidos?: string,
    id_acta?: string,
  ): Observable<Alumno> {
    return this.http.get<Alumno>(
      this.apiUrl + API_ENDPOINTS.ALUMNO_UPDATE + { nombre, apellidos, id_acta },
    )
  }
  /** ---------------------------------------------------------------------- */
}
 