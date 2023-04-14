import { ComprensionConvocatoria } from './comprension'
import { ExpresionConvocatoria } from './expresion'
import { Horario } from './horario'
import { Lenguaje } from './lenguaje'
import { Nivel } from './nivel'

export interface Convocatoria {
  idConvocatoria?: number
  estado: boolean
  fecha: Date
  horario: Horario
  lenguaje: Lenguaje
  nivel: Nivel
  comprensionAuditiva: ComprensionConvocatoria
  comprensionLectora: ComprensionConvocatoria
  expresionEscrita: ExpresionConvocatoria
  expresionOral: ExpresionConvocatoria
  specificIdentifier: number
}
