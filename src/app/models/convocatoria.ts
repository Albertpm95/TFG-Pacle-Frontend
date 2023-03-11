import { Horario } from './horario'
import { Lenguaje } from './lenguaje'
import { Nivel } from './nivel'

export interface Convocatoria {
  estado: boolean
  fecha: Date
  horario: Horario
  lenguaje: Lenguaje
  nivel: Nivel
  comprension_auditiva_puntuacion_maxima_parte: number
  comprension_lectora_puntuacion_maxima_parte: number
  expresion_escrita_puntuacion_maxima_parte: number
  expresion_oral_puntuacion_maxima_parte: number
  id_convocatoria: number
}
