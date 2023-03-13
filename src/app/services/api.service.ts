import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { API_ENDPOINTS, MODULES } from '@constants'
import { environment } from '@environments/environment'
import { Acta } from '@models/acta'
import { Alumno } from '@models/alumno'
import { ComprensionAuditiva } from '@models/comprension_auditiva'
import { ComprensionLectora } from '@models/comprension_lectora'
import { Convocatoria } from '@models/convocatoria'
import { ExpresionEscrita } from '@models/expresion_escrita'
import { FakeDB } from '@models/fake-db'
import { Horario } from '@models/horario'
import { Lenguaje } from '@models/lenguaje'
import { Rol } from '@models/rol'
import { Usuario } from '@models/usuario'
import { Observable, of } from 'rxjs'

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
    return this.http.get<Rol[]>(this.apiUrl + API_ENDPOINTS.CONFIG_ROL_LIST)
  }
  /** ---------------------------------------------------------------------- */

  /** Convocatorias */
  getConvocatorias(): Observable<Convocatoria[]> {
    return this.http.get<Convocatoria[]>(
      this.apiUrl + API_ENDPOINTS.CONVOCATORIA_LIST,
    )
  }
  getConvocatoria(id_convocatoria: number): Observable<Convocatoria> {
    return this.http.get<Convocatoria>(
      this.apiUrl + API_ENDPOINTS.CONVOCATORIA_UPDATE + '/' + id_convocatoria,
    )
  }
  cambiarEstadoConvocatoria(id_convocatoria: number, estado_nuevo: boolean) {
    return this.http.patch<Convocatoria>(this.apiUrl, {
      id_convocatoria,
      estado_nuevo,
    })
  }
  updateConvocatoria(convocatoria: Convocatoria): Observable<Convocatoria> {
    return this.http.post<Convocatoria>(this.apiUrl + API_ENDPOINTS.CONVOCATORIA_UPDATE, { convocatoria })
  }
  /** ---------------------------------------------------------------------- */

  /** Configuracion */
  getHorariosConvocatoria(): Observable<Horario[]> {
    return this.http.get<Horario[]>(
      this.apiUrl + API_ENDPOINTS.CONFIG_HORARIO_LIST,
    )
  }
  addHorarioConvocatoria(horario: string): Observable<Horario> {
    return this.http.put<Horario>(this.apiUrl + API_ENDPOINTS.CONFIG_HORARIO_CREATE, { horario })
  }
  deleteHorarioConvocatoria(id_horario: number): Observable<Horario> {
    return this.http.delete<Horario>(this.apiUrl + API_ENDPOINTS.CONFIG_HORARIO_DELETE + id_horario)
  }
  getIdiomasConvocatoria(): Observable<Lenguaje[]> {
    return this.http.get<Lenguaje[]>(
      this.apiUrl + API_ENDPOINTS.CONFIG_IDIOMA_LIST,
    )
  }
  addIdiomaConvocatoria(lenguaje: string): Observable<Lenguaje> {
    return this.http.put<Lenguaje>(this.apiUrl + API_ENDPOINTS.CONFIG_IDIOMA_CREATE, { lenguaje })
  }
  deleteIdiomaConvocatoria(id_lenguaje: number): Observable<Lenguaje> {
    return this.http.delete<Lenguaje>(this.apiUrl + API_ENDPOINTS.CONFIG_IDIOMA_DELETE + id_lenguaje)
  }
  /** ---------------------------------------------------------------------- */

  /** Actas */
  getActas(): Observable<Acta[]> {
    return this.http.get<Acta[]>(this.apiUrl + API_ENDPOINTS.ACTA_LIST)
  }
  getActaID(id_acta: number): Observable<Acta> {
    return this.http.get<Acta>(this.apiUrl + API_ENDPOINTS.ACTA_UPDATE + id_acta)
  }
  /** ---------------------------------------------------------------------- */

  /** Comprension */
  updateComprensionLectora(comprensionLectora: ComprensionLectora): Observable<ComprensionLectora> {
    return this.http.patch<ComprensionLectora>(this.apiUrl + API_ENDPOINTS.EXPRESION_UPDATE, { comprensionLectora })
  }

  updateComprensionAuditiva(comprensionAuditiva: ComprensionAuditiva): Observable<ComprensionAuditiva> {
    return this.http.patch<ComprensionAuditiva>(this.apiUrl + API_ENDPOINTS.EXPRESION_UPDATE, { comprensionAuditiva })
  }

  /** ---------------------------------------------------------------------- */

  /** Expresion */
  updateExpresionEscrita(expresion_escrita: ExpresionEscrita): Observable<ExpresionEscrita> {
    return this.http.patch<ExpresionEscrita>(this.apiUrl + API_ENDPOINTS.EXPRESION_UPDATE, { expresion_escrita })
  }

  updateExpresionOral(expresion_oral: ExpresionEscrita): Observable<ExpresionEscrita> {
    return this.http.patch<ExpresionEscrita>(this.apiUrl + API_ENDPOINTS.EXPRESION_UPDATE, { expresion_oral })
  }
  /** ---------------------------------------------------------------------- */

  /** Alumnos */
  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl + API_ENDPOINTS.ALUMNO_LIST)
  }
  getAlumnoID(id_alumno: number): Observable<Alumno> {
    this.http.get<Alumno>(this.apiUrl + API_ENDPOINTS.ALUMNO_UPDATE + '/' + id_alumno)
    console.log('Retrieving fake alumno')
    return of(FakeDB.alumnoFake)
  }
  updateAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl + API_ENDPOINTS.ALUMNO_UPDATE, { alumno })
  }
  /** ---------------------------------------------------------------------- */

  /** Usuarios */
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl + API_ENDPOINTS.USUARIO_LIST)
  }
  getUsuarioID(
    id_usuario?: string,
  ): Observable<Usuario> {
    return this.http.get<Usuario>(
      this.apiUrl + API_ENDPOINTS.USUARIO_UPDATE + { id_usuario },
    )
  }
  /** ---------------------------------------------------------------------- */
}
