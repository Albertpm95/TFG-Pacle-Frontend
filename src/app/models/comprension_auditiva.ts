import { Tarea } from './tareaExpresion'
import { Usuario } from './usuario'

export interface ComprensionAuditiva {
  id_comprension_auditiva?: number
  puntuacionMaximaParte?: number
  listaTareas: Tarea[]
  puntosConseguidos?: number
  observaciones: string
  porcentaje?: number
  corrector: Usuario
}
