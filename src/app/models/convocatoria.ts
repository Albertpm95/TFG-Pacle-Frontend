import { Horario } from './horario'
import { Lenguaje } from './lenguaje'
import { Nivel } from './nivel'
import { Parte } from './parte'

export interface Convocatoria {
  idConvocatoria?: number
  estado: boolean
  fecha: Date
  horario: Horario
  lenguaje: Lenguaje
  nivel: Nivel
  comprensionAuditiva: Parte
  comprensionLectora: Parte
  expresionEscrita: Parte
  expresionOral: Parte
  specificIdentifier: number
}
