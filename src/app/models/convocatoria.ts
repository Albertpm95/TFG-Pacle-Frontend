import { Horario } from './horario'
import { Lenguaje } from './lenguaje'
import { Nivel } from './nivel'
import { Parte, ParteNueva } from './parte'

export interface ConvocatoriaNueva {
  estado: boolean
  fecha: Date
  parteComprensionAuditiva: ParteNueva
  parteComprensionLectora: ParteNueva
  parteExpresionEscrita: ParteNueva
  parteExpresionOral: ParteNueva
  horario: Horario
  lenguaje: Lenguaje
  nivel: Nivel
  specificIdentifier: string
}
export interface ConvocatoriaDB {
  estado: boolean
  fecha: Date
  parteComprensionAuditiva: Parte
  parteComprensionLectora: Parte
  parteExpresionEscrita: Parte
  parteExpresionOral: Parte
  horario: Horario
  lenguaje: Lenguaje
  nivel: Nivel
  specificIdentifier: string
  idConvocatoria: number
}