import { Alumno } from './alumno'
import { Convocatoria } from './convocatoria'
import { ParteCorregida } from './parte'
import { Usuario } from './usuario'

export interface Acta {
  alumno: Alumno
  convocatoria: Convocatoria
  corrector: Usuario
  comprensionAuditiva: ParteCorregida
  comprensionLectora: ParteCorregida
  expresionEscrita: ParteCorregida
  expresionOral: ParteCorregida
  idActa?: number
  resultado?: string
  resultadoLectoEscritura?: number
  resultadoDestrezasOrales?: number
  resultadoGlobal?: number
}
