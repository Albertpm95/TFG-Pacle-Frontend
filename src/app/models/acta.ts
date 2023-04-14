import { Alumno } from './alumno'
import { Comprension } from './comprension'
import { Convocatoria } from './convocatoria'
import { Expresion } from './expresion'

import { Usuario } from './usuario'

export interface Acta {
  alumno: Alumno
  comprensionAuditiva: Comprension
  comprensionLectora: Comprension
  convocatoria: Convocatoria
  corrector: Usuario
  expresionEscrita: Expresion
  expresionOral: Expresion
  idActa?: number
  resultado: string
  resultadoLectoEscritura: number
  resultadoDestrezasOrales: number
  resultadoGlobal: number
}
