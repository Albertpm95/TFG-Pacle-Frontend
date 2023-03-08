import { UserAction } from "@models/acciones-usuario"

export class CONSTANTS {
  static ESTADO_POR_DEFECTO: boolean = true
  static HORARIO: string = 'horario'
  static IDIOMA: string = 'idioma'
  static LENGUAJE_POR_DEFECTO: string = 'Español'
  static NOMBRE_CORRECTOR_DEFECTO: string = 'No asignado'
  static RESULTADO_ACTA: string = 'No corregido'
  static PORCIENTO: number = 100 // Para calcular el porcentaje
  static ROL: string = 'rol'
  static TIPO_POR_DEFECTO: string = 'Ordinaria'
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
  static LOGIN = 'login'
  static USUARIO = 'usuario'
}
export class API_Routers {
  static ACTA = 'acta'
  static ADMIN = 'admin'
  static ALUMNO = 'alumno'
  static COMPRENSION = 'comprension'
  static CONFIG = 'config'
  static CONVOCATORIA = 'convocatoria'
  static EXPRESION = 'expression'
  static LOGIN = 'login'
  static USUARIO = 'usuario'
}
export class ACTIONS {
  static CREATE = 'create'
  static DELETE = 'delete'
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
  static COMPRENSION_UPDATE = API_Routers.COMPRENSION + '/' + ACTIONS.UPDATE
  static CONFIG_CREATE_HORARIO = API_Routers.CONFIG + '/' + ACTIONS.CREATE + '/' + CONSTANTS.HORARIO
  static CONFIG_CREATE_IDIOMA = API_Routers.CONFIG + '/' + ACTIONS.CREATE + '/' + CONSTANTS.IDIOMA
  static CONFIG_DELETE_HORARIO = API_Routers.CONFIG + '/' + ACTIONS.DELETE + '/' + CONSTANTS.HORARIO
  static CONFIG_DELETE_IDIOMA = API_Routers.CONFIG + '/' + ACTIONS.DELETE + '/' + CONSTANTS.IDIOMA
  static CONFIG_LIST_HORARIO = API_Routers.CONFIG + '/' + ACTIONS.LIST + '/' + CONSTANTS.HORARIO
  static CONFIG_LIST_IDIOMA = API_Routers.CONFIG + '/' + ACTIONS.LIST + '/' + CONSTANTS.IDIOMA
  static CONFIG_LIST_ROL = API_Routers.CONFIG + '/' + ACTIONS.LIST + '/' + CONSTANTS.ROL
  static CONVOCATORIA_CREATE = API_Routers.CONVOCATORIA + '/' + ACTIONS.CREATE
  static CONVOCATORIA_DELETE = API_Routers.CONVOCATORIA + '/' + ACTIONS.DELETE
  static CONVOCATORIA_LIST = API_Routers.CONVOCATORIA + '/' + ACTIONS.LIST
  static CONVOCATORIA_UPDATE = API_Routers.CONVOCATORIA + '/' + ACTIONS.UPDATE
  static EXPRESION_UPDATE = API_Routers.EXPRESION + '/' + ACTIONS.UPDATE
  static USUARIO_CREATE = API_Routers.USUARIO + '/' + ACTIONS.CREATE
  static USUARIO_DELETE = API_Routers.USUARIO + '/' + ACTIONS.DELETE
  static USUARIO_LIST = API_Routers.USUARIO + '/' + ACTIONS.LIST
  static USUARIO_UPDATE = API_Routers.USUARIO + '/' + ACTIONS.UPDATE
}
export class COMPONENTS {
  static EDITION = 'edition'
  static LIST = 'list'
  static MENU = 'menu'
  static PANEL = 'panel'
  static UPLOAD = 'upload'
}
export abstract class ACTION_LIST {
  static readonly MENU: UserAction[] = [
    { action_label: 'Ver la lista de convocatorias', url: MODULES.CONVOCATORIA + '/' + COMPONENTS.LIST, rol: [ROLES.ADMIN] },
    { action_label: 'Ver la lista de usuarios', url: MODULES.USUARIO + '/' + COMPONENTS.LIST, rol: [ROLES.ADMIN] },
    { action_label: 'Ver la lista de alumnos', url: MODULES.ALUMNO + '/' + COMPONENTS.LIST, rol: [ROLES.ADMIN] },
    { action_label: 'Ver la lista de actas', url: MODULES.ACTA + '/' + COMPONENTS.LIST, rol: [ROLES.ADMIN] },
    { action_label: 'Panel de administrador', url: MODULES.ADMIN + '/' + COMPONENTS.PANEL, rol: [ROLES.ADMIN] },
  ]
}
