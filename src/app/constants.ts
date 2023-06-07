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
  static ESTADO_POR_DEFECTO = true
  static HORARIO = 'horario'
  static LENGUAJE = 'lenguaje'
  static NIVEL = 'nivel'
  static GENERO = 'genero'
  static COLECTIVOUV = 'colectivoUV'
  static NOMBRE_CORRECTOR_DEFECTO = 'No asignado'
  static NOMBRE_TAREA_DEFECTO = 'No asignado'
  static RESULTADO_ACTA = 'No corregido'
  static PORCIENTO = 100 // Para calcular el porcentaje
  static ROL = 'rol'
  static VALOR_PUNTUACION_MAX_DEFECTO = 0
  static VALOR_TAREA_DEFECTO = 0
  static PANEL = 'panel'
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
  static MATRICULA = 'matricula'
}
export class APIROUTERS {
  static ACTA = MODULES.ACTA
  static ADMIN = MODULES.ADMIN
  static ALUMNO = MODULES.ALUMNO
  static CONFIG = 'config'
  static CONVOCATORIA = MODULES.CONVOCATORIA
  static LOGIN = 'login'
  static PARTE = 'parte'
  static USUARIO = MODULES.USUARIO
  static MATRICULA = MODULES.MATRICULA
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
  static REGISTER = 'register'
}
export class APIENDPOINTS {
  static ACTA_CREATE = APIROUTERS.ACTA + '/' + ACTIONS.CREATE
  static ACTA_DELETE = APIROUTERS.ACTA + '/' + ACTIONS.DELETE
  static ACTA_LIST = APIROUTERS.ACTA + '/' + ACTIONS.LIST
  static ACTA_UPDATE = APIROUTERS.ACTA + '/' + ACTIONS.UPDATE
  static ADMIN_UPLOAD_ALUMNOS = APIROUTERS.ADMIN + '/' + ACTIONS.UPDATE + '/' + APIROUTERS.ALUMNO
  static ALUMNO_CREATE = APIROUTERS.ALUMNO + '/' + ACTIONS.CREATE
  static ALUMNO_DETAILS = APIROUTERS.ALUMNO + '/' + ACTIONS.DETAILS
  static ALUMNO_DELETE = APIROUTERS.ALUMNO + '/' + ACTIONS.DELETE
  static ALUMNO_LIST = APIROUTERS.ALUMNO + '/' + ACTIONS.LIST
  static ALUMNO_UPDATE = APIROUTERS.ALUMNO + '/' + ACTIONS.UPDATE
  static CONFIG_HORARIO_CREATE = APIROUTERS.CONFIG + '/' + CONSTANTS.HORARIO + '/' + ACTIONS.CREATE
  static CONFIG_HORARIO_DELETE = APIROUTERS.CONFIG + '/' + CONSTANTS.HORARIO + '/' + ACTIONS.DELETE
  static CONFIG_HORARIO_LIST = APIROUTERS.CONFIG + '/' + CONSTANTS.HORARIO + '/' + ACTIONS.LIST
  static CONFIG_LENGUAJE_CREATE = APIROUTERS.CONFIG + '/' + CONSTANTS.LENGUAJE + '/' + ACTIONS.CREATE
  static CONFIG_LENGUAJE_DELETE = APIROUTERS.CONFIG + '/' + CONSTANTS.LENGUAJE + '/' + ACTIONS.DELETE
  static CONFIG_LENGUAJE_LIST = APIROUTERS.CONFIG + '/' + CONSTANTS.LENGUAJE + '/' + ACTIONS.LIST
  static CONFIG_NIVEL_CREATE = APIROUTERS.CONFIG + '/' + CONSTANTS.NIVEL + '/' + ACTIONS.CREATE
  static CONFIG_NIVEL_DELETE = APIROUTERS.CONFIG + '/' + CONSTANTS.NIVEL + '/' + ACTIONS.DELETE
  static CONFIG_NIVEL_LIST = APIROUTERS.CONFIG + '/' + CONSTANTS.NIVEL + '/' + ACTIONS.LIST
  static CONFIG_GENERO_CREATE = APIROUTERS.CONFIG + '/' + CONSTANTS.GENERO + '/' + ACTIONS.CREATE
  static CONFIG_GENERO_DELETE = APIROUTERS.CONFIG + '/' + CONSTANTS.GENERO + '/' + ACTIONS.DELETE
  static CONFIG_GENERO_LIST = APIROUTERS.CONFIG + '/' + CONSTANTS.GENERO + '/' + ACTIONS.LIST
  static CONFIG_COLECTIVOUV_CREATE = APIROUTERS.CONFIG + '/' + CONSTANTS.COLECTIVOUV + '/' + ACTIONS.CREATE
  static CONFIG_COLECTIVOUV_DELETE = APIROUTERS.CONFIG + '/' + CONSTANTS.COLECTIVOUV + '/' + ACTIONS.DELETE
  static CONFIG_COLECTIVOUV_LIST = APIROUTERS.CONFIG + '/' + CONSTANTS.COLECTIVOUV + '/' + ACTIONS.LIST
  static CONFIG_ROL_CREATE = APIROUTERS.CONFIG + '/' + CONSTANTS.ROL + '/' + ACTIONS.CREATE
  static CONFIG_ROL_LIST = APIROUTERS.CONFIG + '/' + CONSTANTS.ROL + '/' + ACTIONS.LIST
  static CONVOCATORIA_CREATE = APIROUTERS.CONVOCATORIA + '/' + ACTIONS.CREATE
  static CONVOCATORIA_DETAILS = APIROUTERS.CONVOCATORIA + '/' + ACTIONS.DETAILS
  static CONVOCATORIA_DELETE = APIROUTERS.CONVOCATORIA + '/' + ACTIONS.DELETE
  static CONVOCATORIA_LIST = APIROUTERS.CONVOCATORIA + '/' + ACTIONS.LIST
  static CONVOCATORIA_UPDATE = APIROUTERS.CONVOCATORIA + '/' + ACTIONS.UPDATE
  static PARTE_UPDATE = APIROUTERS.PARTE + '/' + ACTIONS.UPDATE
  static USUARIO_ACTUAL = APIROUTERS.USUARIO + '/' + ACTIONS.ACTUAL
  static USUARIO_CREATE = APIROUTERS.USUARIO + '/' + ACTIONS.CREATE
  static USUARIO_DELETE = APIROUTERS.USUARIO + '/' + ACTIONS.DELETE
  static USUARIO_DETAILS = APIROUTERS.USUARIO + '/' + ACTIONS.DETAILS
  static USUARIO_LIST = APIROUTERS.USUARIO + '/' + ACTIONS.LIST
  static USUARIO_UPDATE = APIROUTERS.USUARIO + '/' + ACTIONS.UPDATE
  static MATRICULAR = APIROUTERS.MATRICULA + '/' + ACTIONS.REGISTER
}
export class COMPONENTS {
  static EDITION = 'edition'
  static LIST = 'list'
  static MENU = 'menu'
  static PANEL = 'panel'
  static UPLOAD = 'upload'
  static LOGIN = 'login'
  static REGISTER = 'register'
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
      actionLabel: 'Matricular alumno en convocatoria',
      url: MODULES.MATRICULA + '/' + COMPONENTS.REGISTER,
      rol: [ROLES.ADMIN]
    },
    {
      actionLabel: 'Panel de administrador',
      url: MODULES.ADMIN + '/' + COMPONENTS.PANEL,
      rol: [ROLES.ADMIN]
    }
  ]
}
