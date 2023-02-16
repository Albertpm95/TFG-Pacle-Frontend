import { Constants } from '@constants'

export class ConvocatoriaNueva {
  estado: boolean = Constants.ESTADO_POR_DEFECTO
  fecha: Date = new Date()
  lenguaje: string = Constants.LENGUAJE_POR_DEFECTO
  tipo: string = Constants.TIPO_POR_DEFECTO
  puntuacionMaximaParteExpresionEscrita: number =
    Constants.VALOR_PUNTUACION_MAX_DEFECTO
  puntuacionMaximaParteExpresionOral: number =
    Constants.VALOR_PUNTUACION_MAX_DEFECTO
  puntuacionMaximaParteComprensionLectora: number =
    Constants.VALOR_PUNTUACION_MAX_DEFECTO
  puntuacionMaximaParteComprensionAuditiva: number =
    Constants.VALOR_PUNTUACION_MAX_DEFECTO

  constructor(fechaParcial?: Date, convocatoria?: Partial<ConvocatoriaNueva>) {
    Object.assign(this, convocatoria)
    this.fecha = fechaParcial ? fechaParcial : this.fecha
  }
}
