import { Tarea } from './tarea'
import { Usuario } from './usuario'

export interface ComprensionAuditiva {
  corrector: Usuario
  id_comprension_auditiva?: number
  lista_tareas: Tarea[]
  observaciones: string
  porcentaje: number
  puntos_conseguidos: number
  puntuacion_maxima: number
}
