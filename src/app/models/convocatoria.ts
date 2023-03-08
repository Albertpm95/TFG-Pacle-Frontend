import { CONSTANTS } from '@constants'

export class Convocatoria {
  estado: boolean = CONSTANTS.ESTADO_POR_DEFECTO
  fecha: Date = new Date()
  horario: string = '00:00'
  lenguaje: string = CONSTANTS.LENGUAJE_POR_DEFECTO
  puntuacionMaximaParteComprensionAuditiva: number = CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO
  puntuacionMaximaParteComprensionLectora: number = CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO
  puntuacionMaximaParteExpresionEscrita: number = CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO
  puntuacionMaximaParteExpresionOral: number = CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO
  tipo: string = CONSTANTS.TIPO_POR_DEFECTO
  id_convocatoria?: number

  constructor(fechaParcial?: Date, convocatoria?: Partial<Convocatoria>) {
    Object.assign(this, convocatoria)
    this.fecha = fechaParcial ? fechaParcial : this.fecha
  }
}
