import { UserAction } from "@models/acciones-usuario"

export class Constants {
  static ESTADO_POR_DEFECTO: boolean = true
  static HORARIOS: string = 'horarios'
  static IDIOMAS: string = 'idiomas'
  static LENGUAJE_POR_DEFECTO: string = 'Español'
  static NOMBRE_CORRECTOR_DEFECTO: string = 'No asignado'
  static RESULTADO_ACTA: string = 'No corregido'
  static PORCIENTO: number = 100 // Para calcular el porcentaje
  static ROLES: string = 'roles'
  static TIPO_POR_DEFECTO: string = 'Ordinaria'
  static TIPOS: string = 'tipos'
  static VALOR_PUNTUACION_MAX_DEFECTO: number = 0
  static VALOR_TAREA_DEFECTO: number = 0
}
export class Roles {
  static ADMIN = 'admin'
  static GESTOR = 'gestor'
  static CORRECTOR = 'corrector'
}
export class Routers {
  static ACTA = 'actas'
  static ADMIN = 'admins'
  static ALUMNO = 'alumnos'
  static CONVOCATORIA = 'convocatorias'
  static LOGIN = 'login'
  static USUARIO = 'usuarios'
}
export class Features {
  static ACTIONS = 'actions'
  static EDIT = 'edit'
  static LIST = 'list'
  static LOGIN = 'login'
  static UPLOAD = 'upload'
}
export class API_ENDPOINTS {
  static ACTA_EDIT = Routers.ACTA + '/' + Features.EDIT
  static ACTAS_LIST = Routers.ACTA + '/' + Features.LIST
  static ALUMNOS_LIST = Routers.ALUMNO + '/' + Features.LIST
  static ALUMNO_UPLOAD_EXCEL = Routers.ALUMNO + '/' + Features.UPLOAD
  static CONVOCATORIA_EDIT = Routers.CONVOCATORIA + '/' + Features.EDIT
  static CONVOCATORIA_HORARIOS = Routers.CONVOCATORIA + '/' + Constants.HORARIOS
  static CONVOCATORIA_IDIOMAS = Routers.CONVOCATORIA + '/' + Constants.IDIOMAS
  static CONVOCATORIAS_LIST = Routers.CONVOCATORIA + '/' + Features.LIST
  static CONVOCATORIA_TIPOS = Routers.CONVOCATORIA + '/' + Constants.TIPOS
  static USUARIO_ACCIONES = Routers.USUARIO + '/' + Features.ACTIONS
  static USUARIOS_LIST = Routers.USUARIO + '/' + Features.LIST
  static USUARIO_ROLES = Routers.USUARIO + '/' + Features.ACTIONS
}
export abstract class ACTION_LIST {
  static readonly ADMIN_LIST: UserAction[] = [
    { action_label: 'Crear un convocatoria nueva', url: API_ENDPOINTS.CONVOCATORIA_EDIT, rol: [Roles.ADMIN] },
    { action_label: 'Ver la lista de convocatorias', url: API_ENDPOINTS.CONVOCATORIAS_LIST, rol: [Roles.ADMIN] },
    { action_label: 'Editar lista de idiomas', url: '', rol: [Roles.ADMIN] },
    { action_label: 'Editar lista de tipos de convocatoria', url: '', rol: [Roles.ADMIN] },
    { action_label: 'Editar lista de horarios', url: '', rol: [Roles.ADMIN] },
    { action_label: 'Dar de alta un usuario nuevo', url: '', rol: [Roles.ADMIN] },
    { action_label: 'Ver la lista de usuarios', url: '', rol: [Roles.ADMIN] },
    { action_label: 'Ver la lista de alumnos', url: API_ENDPOINTS.ALUMNOS_LIST, rol: [Roles.ADMIN] },
    { action_label: 'Cargar CSV', url: '', rol: [Roles.ADMIN] }
  ]
  static readonly CORRECTOR_LIST: UserAction[] = [{ action_label: 'Ver la lista de convocatorias activas', url: '', rol: [Roles.CORRECTOR] }]
  static readonly GESTOR_LIST: UserAction[] = []
}
