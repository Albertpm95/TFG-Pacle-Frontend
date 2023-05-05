import { Horario } from './horario'
import { Lenguaje } from './lenguaje'
import { Nivel } from './nivel'
import { Parte } from './parte'

export class Convocatoria {
  idConvocatoria?: number
  parteComprensionAuditiva: Parte = new Parte()
  parteComprensionLectora: Parte = new Parte()
  parteExpresionEscrita: Parte = new Parte()
  parteExpresionOral: Parte = new Parte()
  estado: boolean = true
  fecha: Date = new Date()
  horario: Horario | undefined
  lenguaje: Lenguaje | undefined
  nivel: Nivel | undefined
  specificIdentifier: string = ''
}
