import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { API_ENDPOINTS } from '@constants'
import { environment } from '@environments/environment'
import { Acta } from '@models/acta'
import { Alumno } from '@models/alumno'
import { ComprensionAuditiva } from '@models/comprension_auditiva'
import { ComprensionLectora } from '@models/comprension_lectora'
import { Convocatoria } from '@models/convocatoria'
import { ExpresionEscrita } from '@models/expresion_escrita'
import { ExpresionOral } from '@models/expresion_oral'
import { FakeDB } from '@models/fake-db'
import { Genero } from '@models/genero'
import { Horario } from '@models/horario'
import { Lenguaje } from '@models/lenguaje'
import { Nivel } from '@models/nivel'
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
    return of([FakeDB.convocatoriaFake, FakeDB.convocatoriaFake, FakeDB.convocatoriaFake, FakeDB.convocatoriaFake, FakeDB.convocatoriaFake, FakeDB.convocatoriaFake, FakeDB.convocatoriaFake]) // TODO Remove
    return this.http.get<Convocatoria[]>(
      this.apiUrl + API_ENDPOINTS.CONVOCATORIA_LIST,
    )
  }
  getConvocatoria(idConvocatoria: number): Observable<Convocatoria> {
    return of(FakeDB.convocatoriaFake)
    return this.http.get<Convocatoria>(
      this.apiUrl + API_ENDPOINTS.CONVOCATORIA_UPDATE + '/' + idConvocatoria,
    )
  }
  cambiarEstadoConvocatoria(idConvocatoria: number, estado_nuevo: boolean) {
    return this.http.patch<Convocatoria>(this.apiUrl, {
      idConvocatoria,
      estado_nuevo,
    })
  }
  updateConvocatoria(convocatoria: Convocatoria): Observable<Convocatoria> {
    return this.http.post<Convocatoria>(this.apiUrl + API_ENDPOINTS.CONVOCATORIA_UPDATE, { convocatoria })
  }
  /** ---------------------------------------------------------------------- */

  /** Configuracion */
  getHorariosConvocatoria(): Observable<Horario[]> {
    return of([FakeDB.horarioFake, FakeDB.horarioFake, FakeDB.horarioFake, FakeDB.horarioFake, FakeDB.horarioFake, FakeDB.horarioFake,])
    return this.http.get<Horario[]>(
      this.apiUrl + API_ENDPOINTS.CONFIG_HORARIO_LIST,
    )
  }
  addHorarioConvocatoria(horario: string): Observable<Horario> {
    return this.http.put<Horario>(this.apiUrl + API_ENDPOINTS.CONFIG_HORARIO_CREATE, { horario })
  }
  deleteHorarioConvocatoria(idHorario: number): Observable<Horario> {
    return this.http.delete<Horario>(this.apiUrl + API_ENDPOINTS.CONFIG_HORARIO_DELETE + idHorario)
  }
  getLenguajesConvocatoria(): Observable<Lenguaje[]> {
    return of([FakeDB.lenguajeFake, FakeDB.lenguajeFake, FakeDB.lenguajeFake, FakeDB.lenguajeFake, FakeDB.lenguajeFake, FakeDB.lenguajeFake, FakeDB.lenguajeFake,])
    return this.http.get<Lenguaje[]>(
      this.apiUrl + API_ENDPOINTS.CONFIG_IDIOMA_LIST,
    )
  }
  addLenguajeConvocatoria(lenguaje: string): Observable<Lenguaje> {
    return this.http.put<Lenguaje>(this.apiUrl + API_ENDPOINTS.CONFIG_IDIOMA_CREATE, { lenguaje })
  }
  deleteLenguajeConvocatoria(idLenguaje: number): Observable<Lenguaje> {
    return this.http.delete<Lenguaje>(this.apiUrl + API_ENDPOINTS.CONFIG_IDIOMA_DELETE + idLenguaje)
  }
  getNivelesConvocatoria(): Observable<Nivel[]> {
    return of([FakeDB.nivelFake, FakeDB.nivelFake, FakeDB.nivelFake, FakeDB.nivelFake, FakeDB.nivelFake, FakeDB.nivelFake, FakeDB.nivelFake,])
    return this.http.get<Nivel[]>(
      this.apiUrl + API_ENDPOINTS.CONFIG_IDIOMA_LIST,
    )
  }
  addNivelConvocatoria(nivel: string): Observable<Nivel> {
    return this.http.put<Nivel>(this.apiUrl + API_ENDPOINTS.CONFIG_IDIOMA_CREATE, { nivel })
  }
  deleteNivelConvocatoria(idNivel: number): Observable<Nivel> {
    return this.http.delete<Nivel>(this.apiUrl + API_ENDPOINTS.CONFIG_IDIOMA_DELETE + idNivel)
  }
  getGenerosConvocatoria(): Observable<Genero[]> {
    return of([FakeDB.generoFake, FakeDB.generoFake, FakeDB.generoFake, FakeDB.generoFake, FakeDB.generoFake, FakeDB.generoFake, FakeDB.generoFake,])
    return this.http.get<Genero[]>(
      this.apiUrl + API_ENDPOINTS.CONFIG_IDIOMA_LIST,
    )
  }
  addGeneroConvocatoria(genero: string): Observable<Genero> {
    return this.http.put<Genero>(this.apiUrl + API_ENDPOINTS.CONFIG_IDIOMA_CREATE, { genero })
  }
  deleteGeneroConvocatoria(idGenero: number): Observable<Genero> {
    return this.http.delete<Genero>(this.apiUrl + API_ENDPOINTS.CONFIG_IDIOMA_DELETE + idGenero)
  }
  /** ---------------------------------------------------------------------- */

  /** Actas */
  getActas(): Observable<Acta[]> {
    return of([FakeDB.actaFake, FakeDB.actaFake, FakeDB.actaFake, FakeDB.actaFake, FakeDB.actaFake, FakeDB.actaFake, FakeDB.actaFake])
    return this.http.get<Acta[]>(this.apiUrl + API_ENDPOINTS.ACTA_LIST)
  }
  getActaID(idActa: number): Observable<Acta> {
    return this.http.get<Acta>(this.apiUrl + API_ENDPOINTS.ACTA_UPDATE + idActa)
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
  updateExpresionEscrita(expresionEscrita: ExpresionEscrita): Observable<ExpresionEscrita> {
    return this.http.patch<ExpresionEscrita>(this.apiUrl + API_ENDPOINTS.EXPRESION_UPDATE, { expresionEscrita })
  }

  updateExpresionOral(expresionOral: ExpresionOral): Observable<ExpresionOral> {
    return this.http.patch<ExpresionOral>(this.apiUrl + API_ENDPOINTS.EXPRESION_UPDATE, { expresionOral })
  }
  /** ---------------------------------------------------------------------- */

  /** Alumnos */
  getAlumnos(): Observable<Alumno[]> {
    return of([FakeDB.alumnoFake, FakeDB.alumnoFake, FakeDB.alumnoFake, FakeDB.alumnoFake, FakeDB.alumnoFake, FakeDB.alumnoFake, FakeDB.alumnoFake, FakeDB.alumnoFake, FakeDB.alumnoFake,])
    return this.http.get<Alumno[]>(this.apiUrl + API_ENDPOINTS.ALUMNO_LIST)
  }
  getAlumnoID(idAlumno: number): Observable<Alumno> {
    this.http.get<Alumno>(this.apiUrl + API_ENDPOINTS.ALUMNO_UPDATE + '/' + idAlumno)
    console.log('Retrieving fake alumno')
    return of(FakeDB.alumnoFake)
  }
  updateAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl + API_ENDPOINTS.ALUMNO_UPDATE, { alumno })
  }
  /** ---------------------------------------------------------------------- */

  /** Usuarios */
  getUsuarios(): Observable<Usuario[]> {
    return of([FakeDB.usuarioFake, FakeDB.usuarioFake, FakeDB.usuarioFake, FakeDB.usuarioFake, FakeDB.usuarioFake, FakeDB.usuarioFake, FakeDB.usuarioFake, FakeDB.usuarioFake, FakeDB.usuarioFake,])
    return this.http.get<Usuario[]>(this.apiUrl + API_ENDPOINTS.USUARIO_LIST)
  }
  getUsuarioID(
    idUsuario?: string,
  ): Observable<Usuario> {
    return this.http.get<Usuario>(
      this.apiUrl + API_ENDPOINTS.USUARIO_UPDATE + { idUsuario },
    )
  }
  /** ---------------------------------------------------------------------- */
}
