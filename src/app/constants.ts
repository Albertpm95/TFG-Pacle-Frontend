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
export class Paths {
  static ACTA = 'acta'
  static ADMIN = 'admin'
  static ALUMNO = 'alumno'
  static USUARIO = 'usuario'
}
export class Features {
  static ACTIONS = 'actions'
  static CORRECT = 'correct'
  static CREATE = 'create'
  static EDIT = 'edit'
  static LIST = 'list'
  static LOGIN = 'login'
  static UPLOAD = 'upload'
}
export class API {
  static ACTA_CORRECT = Paths.ACTA + '/' + Features.CORRECT
  static ACTA_HORARIOS = Paths.ACTA + '/' + Constants.HORARIOS
  static ACTA_IDIOMAS = Paths.ACTA + '/' + Constants.IDIOMAS
  static ACTA_LIST = Paths.ACTA + '/' + Features.LIST
  static ACTA_TIPOS = Paths.ACTA + '/' + Constants.TIPOS
  static ALUMNO_LIST = Paths.ALUMNO + '/' + Features.LIST
  static ALUMNO_UPLOAD_EXCEL = Paths.ALUMNO + '/' + Features.UPLOAD
  static USUARIO_ACCIONES = Paths.USUARIO + '/' + Features.ACTIONS
  static USUARIO_LIST = Paths.USUARIO + '/' + Features.LIST
  static USUARIO_ROLES = Paths.USUARIO + '/' + Features.ACTIONS
}

export const ACTION_LIST = {
  ADMIN_LIST: [
    { action_label: 'Crear un convocatoria nueva', url: '', rol: [Roles.ADMIN] },
    { action_label: 'Ver la lista de convocatorias', url: '', rol: [Roles.ADMIN] },
    { action_label: 'Editar lista de idiomas', url: '', rol: [Roles.ADMIN] },
    { action_label: 'Editar lista de tipos de convocatoria', url: '', rol: [Roles.ADMIN] },
    { action_label: 'Editar lista de horarios', url: '', rol: [Roles.ADMIN] },
    { action_label: 'Dar de alta un usuario nuevo', url: '', rol: [Roles.ADMIN] },
    { action_label: 'Ver la lista de usuarios', url: '', rol: [Roles.ADMIN] },
    { action_label: 'Cargar CSV', url: '', rol: [Roles.ADMIN] }
  ],
  CORRECTOR_LIST: [
    { action_label: 'Ver la lista de convocatorias activas', url: '', rol: [Roles.CORRECTOR] },
  ],
  GESTOR_LIST: [{ action_label: '', url: '', rol: [Roles.GESTOR] },]

}
