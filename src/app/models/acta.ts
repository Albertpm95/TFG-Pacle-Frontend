import { Alumno } from './alumno'
import { ComprensionAuditiva } from './comprension_auditiva'
import { ComprensionLectora } from './comprension_lectora'
import { Convocatoria } from './convocatoria'
import { ExpresionEscrita } from './expresion_escrita'
import { ExpresionOral } from './expresion_oral'
import { Usuario } from './usuario'

export interface Acta {
  alumno: Alumno
  comprensionAuditiva: ComprensionAuditiva
  comprensionLectora: ComprensionLectora
  convocatoria: Convocatoria
  corrector: Usuario
  expresionEscrita: ExpresionEscrita
  expresionOral: ExpresionOral
  idActa?: number
  resultado: string
  resultadoLectoEscritura: number
  resultadoDestrezasOrales: number
  resultadoGlobal: number
}
