import { Horario } from './horario'
import { Lenguaje } from './lenguaje'
import { Nivel } from './nivel'

export interface Convocatoria {
  estado: boolean
  fecha: Date
  horario: Horario
  lenguaje: Lenguaje
  nivel: Nivel
  maximo_comprension_auditiva: number
  maximo_comprension_lectora: number
  maximo_expresion_escrita: number
  maximo_expresion_oral: number
  id_convocatoria: number
}
