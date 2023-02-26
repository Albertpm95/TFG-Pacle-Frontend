import { Constants } from '@constants'

export class Convocatoria {
  estado: boolean = Constants.ESTADO_POR_DEFECTO
  fecha: Date = new Date()
  horario: string = '00:00'
  lenguaje: string = Constants.LENGUAJE_POR_DEFECTO
  puntuacionMaximaParteComprensionAuditiva: number = Constants.VALOR_PUNTUACION_MAX_DEFECTO
  puntuacionMaximaParteComprensionLectora: number = Constants.VALOR_PUNTUACION_MAX_DEFECTO
  puntuacionMaximaParteExpresionEscrita: number = Constants.VALOR_PUNTUACION_MAX_DEFECTO
  puntuacionMaximaParteExpresionOral: number = Constants.VALOR_PUNTUACION_MAX_DEFECTO
  tipo: string = Constants.TIPO_POR_DEFECTO
  id_convocatoria?: number

  constructor(fechaParcial?: Date, convocatoria?: Partial<Convocatoria>) {
    Object.assign(this, convocatoria)
    this.fecha = fechaParcial ? fechaParcial : this.fecha
  }
}
