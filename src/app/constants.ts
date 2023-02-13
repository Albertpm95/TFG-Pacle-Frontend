export class Constants {
  static ESTADO_POR_DEFECTO: boolean = true;
  static IDIOMAS: string = 'idiomas';
  static LENGUAJE_POR_DEFECTO: string = 'Español';
  static PORCIENTO: number = 100; // Para calcular el porcentaje
  static TIPO_POR_DEFECTO: string = 'Ordinaria';
  static TIPOS: string = 'tipos';
  static VALOR_CORRECTOR_DEFECTO: string = 'No asignado';
  static VALOR_PUNTUACION_MAX_DEFECTO: number = 0;
  static VALOR_TAREA_DEFECTO: number = 0;
}

export class Roles {
  static ACTA = 'acta';
  static ADMIN = 'admin';
  static ALUMNO = 'alumno';
  static USUARIO = 'usuario';
}
export class Features {
  static ACTIONS = 'actions';
  static CORRECT = 'correct';
  static CREATE = 'create';
  static EDIT = 'edit';
  static LIST = 'list';
  static LOGIN = 'login';
  static UPLOAD = 'upload';
}
export class API {
  static ACTA_IDIOMAS = Roles.ACTA + '/' + Constants.IDIOMAS;
  static ACTA_LIST = Roles.ACTA + '/' + Features.LIST;
  static ACTA_TIPOS = Roles.ACTA + '/' + Constants.TIPOS;
  static ALUMNO_LIST = Roles.ALUMNO + '/' + Features.LIST;
  static ALUMNO_UPLOAD_EXCEL = Roles.ALUMNO + '/' + Features.UPLOAD;
  static USUARIO_ACCIONES = Roles.USUARIO + '/' + Features.ACTIONS;
  static USUARIO_LIST = Roles.USUARIO + '/' + Features.LIST;
}
