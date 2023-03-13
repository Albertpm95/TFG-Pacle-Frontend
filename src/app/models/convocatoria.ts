import { Horario } from './horario'
import { Lenguaje } from './lenguaje'
import { Nivel } from './nivel'

export interface Convocatoria {
  estado: boolean
  fecha: Date
  horario: Horario
  lenguaje: Lenguaje
  nivel: Nivel
  auditiva_puntuacion_maxima: number
  lectora_puntuacion_maxima: number
  escrita_puntuacion_maxima: number
  oral_puntuacion_maxima: number
  id_convocatoria: number
}
