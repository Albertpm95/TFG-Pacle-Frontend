import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { API_ENDPOINTS } from '@constants'
import { environment } from '@environments/environment'
import { ActaDB, ActaNueva } from '@models/acta'
import { Alumno } from '@models/alumno'
import { ColectivoUV } from '@models/colectivouv'
import { ConvocatoriaDB, ConvocatoriaNueva } from '@models/convocatoria'
import { AlumnosConvocatoria } from '@models/dictionaries'
import { Genero } from '@models/genero'
import { Horario } from '@models/horario'
import { Lenguaje } from '@models/lenguaje'
import { Nivel } from '@models/nivel'
import { Parte } from '@models/parte'
import { Rol } from '@models/rol'
import { Usuario } from '@models/usuario'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.apiURL

  constructor(private http: HttpClient) {}

  /** Admin */
  subirFicheroExcel(excel: File): Observable<File> {
    return this.http.post<File>(this.apiUrl + API_ENDPOINTS.ADMIN_UPLOAD_ALUMNOS, excel)
  }
  getRolesUsuario(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl + API_ENDPOINTS.CONFIG_ROL_LIST)
  }
  addRolUsuario(rol_nuevo: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.apiUrl + API_ENDPOINTS.CONFIG_ROL_CREATE, rol_nuevo)
  }
  /** ---------------------------------------------------------------------- */

  /** Convocatorias */
  getConvocatorias(): Observable<ConvocatoriaDB[]> {
    return this.http.get<ConvocatoriaDB[]>(this.apiUrl + API_ENDPOINTS.CONVOCATORIA_LIST)
  }
  getConvocatoriaID(idConvocatoria: number): Observable<ConvocatoriaDB> {
    return this.http.get<ConvocatoriaDB>(this.apiUrl + API_ENDPOINTS.CONVOCATORIA_DETAILS + '/' + idConvocatoria)
  }
  cambiarEstadoConvocatoria(idConvocatoria: number, estado_nuevo: boolean): Observable<ConvocatoriaDB> {
    return this.http.patch<ConvocatoriaDB>(this.apiUrl, {
      idConvocatoria,
      estado_nuevo
    })
  }
  createConvocatoria(convocatoria_nueva: ConvocatoriaNueva): Observable<ConvocatoriaDB> {
    return this.http.post<ConvocatoriaDB>(this.apiUrl + API_ENDPOINTS.CONVOCATORIA_CREATE, convocatoria_nueva)
  }
  updateConvocatoria(convocatoria_update: ConvocatoriaDB): Observable<ConvocatoriaDB> {
    console.log(convocatoria_update)
    return this.http.put<ConvocatoriaDB>(this.apiUrl + API_ENDPOINTS.CONVOCATORIA_UPDATE, convocatoria_update)
  }
  /** ---------------------------------------------------------------------- */

  /** Configuracion */
  getHorariosConvocatoria(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.apiUrl + API_ENDPOINTS.CONFIG_HORARIO_LIST)
  }
  addHorarioConvocatoria(horario_nuevo: Horario): Observable<Horario> {
    return this.http.post<Horario>(this.apiUrl + API_ENDPOINTS.CONFIG_HORARIO_CREATE, horario_nuevo)
  }
  deleteHorarioConvocatoria(idHorario: number): Observable<Horario> {
    return this.http.delete<Horario>(this.apiUrl + API_ENDPOINTS.CONFIG_HORARIO_DELETE + '/' + idHorario)
  }

  getLenguajesConvocatoria(): Observable<Lenguaje[]> {
    return this.http.get<Lenguaje[]>(this.apiUrl + API_ENDPOINTS.CONFIG_LENGUAJE_LIST)
  }
  addLenguajeConvocatoria(lenguaje_nuevo: Lenguaje): Observable<Lenguaje> {
    return this.http.post<Lenguaje>(this.apiUrl + API_ENDPOINTS.CONFIG_LENGUAJE_CREATE, lenguaje_nuevo)
  }
  deleteLenguajeConvocatoria(idLenguaje: number): Observable<any> {
    return this.http.delete<Lenguaje>(this.apiUrl + API_ENDPOINTS.CONFIG_LENGUAJE_DELETE + '/' + idLenguaje)
  }

  getNivelesConvocatoria(): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(this.apiUrl + API_ENDPOINTS.CONFIG_NIVEL_LIST)
  }
  addNivelConvocatoria(nivel_nuevo: Nivel): Observable<Nivel> {
    return this.http.post<Nivel>(this.apiUrl + API_ENDPOINTS.CONFIG_NIVEL_CREATE, nivel_nuevo)
  }
  deleteNivelConvocatoria(idNivel: number): Observable<Nivel> {
    return this.http.delete<Nivel>(this.apiUrl + API_ENDPOINTS.CONFIG_NIVEL_DELETE + '/' + idNivel)
  }

  getGenerosAlumno(): Observable<Genero[]> {
    return this.http.get<Genero[]>(this.apiUrl + API_ENDPOINTS.CONFIG_GENERO_LIST)
  }
  addGeneroAlumno(genero_nuevo: Genero): Observable<Genero> {
    return this.http.post<Genero>(this.apiUrl + API_ENDPOINTS.CONFIG_GENERO_CREATE, genero_nuevo)
  }
  deleteGeneroAlumno(idGenero: number): Observable<Genero> {
    return this.http.delete<Genero>(this.apiUrl + API_ENDPOINTS.CONFIG_GENERO_DELETE + '/' + idGenero)
  }

  getColectivosUV(): Observable<ColectivoUV[]> {
    return this.http.get<ColectivoUV[]>(this.apiUrl + API_ENDPOINTS.CONFIG_COLECTIVOUV_LIST)
  }
  addColectivoUV(colectivo_nuevo: ColectivoUV): Observable<ColectivoUV> {
    return this.http.post<ColectivoUV>(this.apiUrl + API_ENDPOINTS.CONFIG_COLECTIVOUV_CREATE, colectivo_nuevo)
  }
  deleteColectivoUV(idColectivo: number): Observable<ColectivoUV> {
    return this.http.delete<ColectivoUV>(this.apiUrl + API_ENDPOINTS.CONFIG_COLECTIVOUV_DELETE + '/' + idColectivo)
  }
  /** ---------------------------------------------------------------------- */

  /** Actas */
  getActas(): Observable<ActaDB[]> {
    return this.http.get<ActaDB[]>(this.apiUrl + API_ENDPOINTS.ACTA_LIST)
  }
  getActaID(idActa: number): Observable<ActaDB> {
    return this.http.get<ActaDB>(this.apiUrl + API_ENDPOINTS.ACTA_UPDATE + '/' + idActa)
  }
  createActa(acta_nueva: ConvocatoriaNueva): Observable<ActaNueva> {
    return this.http.post<ActaNueva>(this.apiUrl + API_ENDPOINTS.ACTA_CREATE, acta_nueva)
  }
  updateActa(acta_update: ActaDB): Observable<ActaDB> {
    console.log(acta_update)
    return this.http.put<ActaDB>(this.apiUrl + API_ENDPOINTS.ACTA_UPDATE, acta_update)
  }
  /** ---------------------------------------------------------------------- */

  updateComprension(comprension: Parte): Observable<Parte> {
    return this.http.patch<Parte>(this.apiUrl + API_ENDPOINTS.PARTE_UPDATE, comprension)
  }
  /** ---------------------------------------------------------------------- */

  /** Alumnos */
  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl + API_ENDPOINTS.ALUMNO_LIST)
  }
  getAlumnosConvocatoria(idConvocatoria: number): Observable<AlumnosConvocatoria> {
    return this.http.get<AlumnosConvocatoria>(this.apiUrl + API_ENDPOINTS.ALUMNO_LIST + '/' + idConvocatoria)
  }
  getAlumnoID(idAlumno: number): Observable<Alumno> {
    return this.http.get<Alumno>(this.apiUrl + API_ENDPOINTS.ALUMNO_UPDATE + '/' + idAlumno)
  }
  addAlumno(alumno_nuevo: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl + API_ENDPOINTS.ALUMNO_CREATE, alumno_nuevo)
  }
  updateAlumno(alumno_editado: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(this.apiUrl + API_ENDPOINTS.ALUMNO_UPDATE, alumno_editado)
  }
  deleteAlumno(idAlumno: number): Observable<Alumno> {
    return this.http.delete<Alumno>(this.apiUrl + API_ENDPOINTS.ALUMNO_DELETE + '/' + idAlumno)
  }
  /** ---------------------------------------------------------------------- */

  /** Usuarios */
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl + API_ENDPOINTS.USUARIO_LIST)
  }
  getUsuarioID(idUsuario?: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiUrl + API_ENDPOINTS.USUARIO_DETAILS + '/' + idUsuario)
  }
  getUsuarioActual(): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiUrl + API_ENDPOINTS.USUARIO_ACTUAL)
  }
  addUsuario(usuario_nuevo: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl + API_ENDPOINTS.USUARIO_CREATE, usuario_nuevo)
  }
  updateUsuario(usuario_editado: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.apiUrl + API_ENDPOINTS.USUARIO_UPDATE, usuario_editado)
  }
  /** ---------------------------------------------------------------------- */
}
