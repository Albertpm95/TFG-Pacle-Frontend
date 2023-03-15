import { Horario } from './horario'
import { Lenguaje } from './lenguaje'
import { Nivel } from './nivel'

export interface Convocatoria {
  estado: boolean
  fecha: Date
  horario: Horario
  lenguaje: Lenguaje
  nivel: Nivel
  maxComprensionAuditiva: number
  maxComprensionLectora: number
  maxExpresionEscrita: number
  maxExpresion_oral: number
  id_convocatoria: number
}
