import { Alumno } from './alumno'
import { ConvocatoriaDB } from './convocatoria'
import { ParteCorregidaDB, ParteCorregidaNueva } from './parte'
import { Usuario } from './usuario'

export interface ActaNueva {
  alumno: Alumno
  convocatoria: ConvocatoriaDB
  corrector: Usuario
  comprensionAuditiva: ParteCorregidaNueva
  comprensionLectora: ParteCorregidaNueva
  expresionEscrita: ParteCorregidaNueva
  expresionOral: ParteCorregidaNueva
  resultado?: string
  resultadoLectoEscritura?: number
  resultadoDestrezasOrales?: number
  resultadoGlobal?: number
}

export interface ActaDB {
  alumno: Alumno
  convocatoria: ConvocatoriaDB
  corrector: Usuario
  comprensionAuditiva: ParteCorregidaDB
  comprensionLectora: ParteCorregidaDB
  expresionEscrita: ParteCorregidaDB
  expresionOral: ParteCorregidaDB
  idActa: number
  resultado?: string
  resultadoLectoEscritura?: number
  resultadoDestrezasOrales?: number
  resultadoGlobal?: number
}
