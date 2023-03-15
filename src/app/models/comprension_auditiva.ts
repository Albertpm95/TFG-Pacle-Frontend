import { Tarea } from './tarea'
import { Usuario } from './usuario'

export interface ComprensionAuditiva {
  corrector: Usuario
  idComprensionAuditiva?: number
  listaTareas: Tarea[]
  observaciones: string
  porcentaje: number
  puntosConseguidos: number
  puntuacionMaxima: number
}
