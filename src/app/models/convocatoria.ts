import { CONSTANTS } from '@constants'
import { Horario } from './horario'
import { Lenguaje } from './lenguaje'

export class Convocatoria {
  estado: boolean = CONSTANTS.ESTADO_POR_DEFECTO
  fecha: Date = new Date()
  horario: Horario = new Horario
  lenguaje: Lenguaje = new Lenguaje
  comprension_auditiva_puntuacion_maxima_parte: number = CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO
  comprension_lectora_puntuacion_maxima_parte: number = CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO
  expresion_escrita_puntuacion_maxima_parte: number = CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO
  expresion_oral_puntuacion_maxima_parte: number = CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO
  id_convocatoria: number | undefined

  constructor(convocatoria?: Partial<Convocatoria>, fecha?: Date) {
    if (fecha)
      this.fecha = fecha

    if (convocatoria) {
      this.horario = convocatoria.horario ?? this.horario
      this.lenguaje = convocatoria.lenguaje ?? this.lenguaje
      this.comprension_auditiva_puntuacion_maxima_parte = convocatoria.comprension_auditiva_puntuacion_maxima_parte ?? this.comprension_auditiva_puntuacion_maxima_parte
      this.comprension_lectora_puntuacion_maxima_parte = convocatoria.comprension_lectora_puntuacion_maxima_parte ?? this.comprension_lectora_puntuacion_maxima_parte
      this.expresion_escrita_puntuacion_maxima_parte = convocatoria.expresion_escrita_puntuacion_maxima_parte ?? this.expresion_escrita_puntuacion_maxima_parte
      this.expresion_oral_puntuacion_maxima_parte = convocatoria.expresion_oral_puntuacion_maxima_parte ?? this.expresion_oral_puntuacion_maxima_parte
      this.id_convocatoria = convocatoria.id_convocatoria
    }
  }
}
