import { Alumno } from './alumno'
import { Convocatoria } from './convocatoria'
import { ParteCorregida } from './parte'

import { Usuario } from './usuario'

export interface Acta {
  alumno: Alumno
  comprensionAuditiva: ParteCorregida
  comprensionLectora: ParteCorregida
  convocatoria: Convocatoria
  corrector: Usuario
  expresionEscrita: ParteCorregida
  expresionOral: ParteCorregida
  idActa?: number
  resultado?: string
  resultadoLectoEscritura?: number
  resultadoDestrezasOrales?: number
  resultadoGlobal?: number
}
