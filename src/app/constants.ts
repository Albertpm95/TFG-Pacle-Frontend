import { UserAction } from '@models/acciones-usuario'
export class HttpError {
  static BadRequest = 400
  static Unauthorized = 401
  static Forbidden = 403
  static NotFound = 404
  static TimeOut = 408
  static Conflict = 409
  static InternalServerError = 500
}
export class CONSTANTS {
  static ESTADO_POR_DEFECTO: boolean = true
  static HORARIO: string = 'horario'
  static LENGUAJE: string = 'lenguaje'
  static NIVEL: string = 'nivel'
  static GENERO: string = 'genero'
  static COLECTIVOUV: string = 'colectivoUV'
  static NOMBRE_CORRECTOR_DEFECTO: string = 'No asignado'
  static NOMBRE_TAREA_DEFECTO: string = 'No asignado'
  static RESULTADO_ACTA: string = 'No corregido'
  static PORCIENTO: number = 100 // Para calcular el porcentaje
  static ROL: string = 'rol'
  static VALOR_PUNTUACION_MAX_DEFECTO: number = 0
  static VALOR_TAREA_DEFECTO: number = 0
  static PANEL: string = 'panel'
}
export class ROLES {
  static ADMIN = 'admin'
  static GESTOR = 'gestor'
  static CORRECTOR = 'corrector'
}
export class MODULES {
  static ACTA = 'acta'
  static ADMIN = 'admin'
  static ALUMNO = 'alumno'
  static CONVOCATORIA = 'convocatoria'
  static USUARIO = 'usuario'
}
export class API_Routers {
  static ACTA = 'acta'
  static ADMIN = 'admin'
  static ALUMNO = 'alumno'
  static CONFIG = 'config'
  static CONVOCATORIA = 'convocatoria'
  static LOGIN = 'login'
  static PARTE = 'parte'
  static USUARIO = 'usuario'
}
export class ACTIONS {
  static ACTUAL = 'actual'
  static CREATE = 'create'
  static DELETE = 'delete'
  static DETAILS = 'details'
  static DISABLE = 'disable'
  static ENABLE = 'enable'
  static LIST = 'list'
  static LOGIN = 'login'
  static UPDATE = 'update'
  static UPLOAD = 'upload'
}
export class API_ENDPOINTS {
  static ACTA_CREATE = API_Routers.ACTA + '/' + ACTIONS.CREATE
  static ACTA_DELETE = API_Routers.ACTA + '/' + ACTIONS.DELETE
  static ACTA_LIST = API_Routers.ACTA + '/' + ACTIONS.LIST
  static ACTA_UPDATE = API_Routers.ACTA + '/' + ACTIONS.UPDATE
  static ADMIN_UPLOAD_ALUMNOS = API_Routers.ADMIN + '/' + ACTIONS.UPDATE + '/' + API_Routers.ALUMNO
  static ALUMNO_CREATE = API_Routers.ALUMNO + '/' + ACTIONS.CREATE
  static ALUMNO_DELETE = API_Routers.ALUMNO + '/' + ACTIONS.DELETE
  static ALUMNO_LIST = API_Routers.ALUMNO + '/' + ACTIONS.LIST
  static ALUMNO_UPDATE = API_Routers.ALUMNO + '/' + ACTIONS.UPDATE
  static CONFIG_HORARIO_CREATE = API_Routers.CONFIG + '/' + CONSTANTS.HORARIO + '/' + ACTIONS.CREATE
  static CONFIG_HORARIO_DELETE = API_Routers.CONFIG + '/' + CONSTANTS.HORARIO + '/' + ACTIONS.DELETE
  static CONFIG_HORARIO_LIST = API_Routers.CONFIG + '/' + CONSTANTS.HORARIO + '/' + ACTIONS.LIST
  static CONFIG_LENGUAJE_CREATE = API_Routers.CONFIG + '/' + CONSTANTS.LENGUAJE + '/' + ACTIONS.CREATE
  static CONFIG_LENGUAJE_DELETE = API_Routers.CONFIG + '/' + CONSTANTS.LENGUAJE + '/' + ACTIONS.DELETE
  static CONFIG_LENGUAJE_LIST = API_Routers.CONFIG + '/' + CONSTANTS.LENGUAJE + '/' + ACTIONS.LIST
  static CONFIG_NIVEL_CREATE = API_Routers.CONFIG + '/' + CONSTANTS.NIVEL + '/' + ACTIONS.CREATE
  static CONFIG_NIVEL_DELETE = API_Routers.CONFIG + '/' + CONSTANTS.NIVEL + '/' + ACTIONS.DELETE
  static CONFIG_NIVEL_LIST = API_Routers.CONFIG + '/' + CONSTANTS.NIVEL + '/' + ACTIONS.LIST
  static CONFIG_GENERO_CREATE = API_Routers.CONFIG + '/' + CONSTANTS.GENERO + '/' + ACTIONS.CREATE
  static CONFIG_GENERO_DELETE = API_Routers.CONFIG + '/' + CONSTANTS.GENERO + '/' + ACTIONS.DELETE
  static CONFIG_GENERO_LIST = API_Routers.CONFIG + '/' + CONSTANTS.GENERO + '/' + ACTIONS.LIST
  static CONFIG_COLECTIVOUV_CREATE = API_Routers.CONFIG + '/' + CONSTANTS.COLECTIVOUV + '/' + ACTIONS.CREATE
  static CONFIG_COLECTIVOUV_DELETE = API_Routers.CONFIG + '/' + CONSTANTS.COLECTIVOUV + '/' + ACTIONS.DELETE
  static CONFIG_COLECTIVOUV_LIST = API_Routers.CONFIG + '/' + CONSTANTS.COLECTIVOUV + '/' + ACTIONS.LIST
  static CONFIG_ROL_CREATE = API_Routers.CONFIG + '/' + CONSTANTS.ROL + '/' + ACTIONS.CREATE
  static CONFIG_ROL_LIST = API_Routers.CONFIG + '/' + CONSTANTS.ROL + '/' + ACTIONS.LIST
  static CONVOCATORIA_CREATE = API_Routers.CONVOCATORIA + '/' + ACTIONS.CREATE
  static CONVOCATORIA_DETAILS = API_Routers.CONVOCATORIA + '/' + ACTIONS.DETAILS
  static CONVOCATORIA_DELETE = API_Routers.CONVOCATORIA + '/' + ACTIONS.DELETE
  static CONVOCATORIA_LIST = API_Routers.CONVOCATORIA + '/' + ACTIONS.LIST
  static CONVOCATORIA_UPDATE = API_Routers.CONVOCATORIA + '/' + ACTIONS.UPDATE
  static PARTE_UPDATE = API_Routers.PARTE + '/' + ACTIONS.UPDATE
  static USUARIO_ACTUAL = API_Routers.USUARIO + '/' + ACTIONS.ACTUAL
  static USUARIO_CREATE = API_Routers.USUARIO + '/' + ACTIONS.CREATE
  static USUARIO_DELETE = API_Routers.USUARIO + '/' + ACTIONS.DELETE
  static USUARIO_DETAILS = API_Routers.USUARIO + '/' + ACTIONS.DETAILS
  static USUARIO_LIST = API_Routers.USUARIO + '/' + ACTIONS.LIST
  static USUARIO_UPDATE = API_Routers.USUARIO + '/' + ACTIONS.UPDATE
}
export class COMPONENTS {
  static EDITION = 'edition'
  static LIST = 'list'
  static MENU = 'menu'
  static PANEL = 'panel'
  static UPLOAD = 'upload'
  static LOGIN = 'login'
}
export abstract class ACTION_LIST {
  static readonly MENU: UserAction[] = [
    {
      actionLabel: 'Ver la lista de convocatorias',
      url: MODULES.CONVOCATORIA + '/' + COMPONENTS.LIST,
      rol: [ROLES.ADMIN]
    },
    {
      actionLabel: 'Ver la lista de usuarios',
      url: MODULES.USUARIO + '/' + COMPONENTS.LIST,
      rol: [ROLES.ADMIN]
    },
    {
      actionLabel: 'Ver la lista de alumnos',
      url: MODULES.ALUMNO + '/' + COMPONENTS.LIST,
      rol: [ROLES.ADMIN]
    },
    {
      actionLabel: 'Ver la lista de actas',
      url: MODULES.ACTA + '/' + COMPONENTS.LIST,
      rol: [ROLES.ADMIN]
    },
    {
      actionLabel: 'Panel de administrador',
      url: MODULES.ADMIN + '/' + COMPONENTS.PANEL,
      rol: [ROLES.ADMIN]
    }
  ]
}
