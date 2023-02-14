import { Constants } from 'app/constants'
import { ComprensionAuditiva } from './comprensionAuditiva'
import { ComprensionLectora } from './comprensionLectora'
import { ExpresionEscrita } from './expresionEscrita'
import { ExpresionOral } from './expresionOral'

export class Acta {
  idActa?: string
  lenguaje: string = Constants.LENGUAJE_POR_DEFECTO
  tipo: string = Constants.TIPO_POR_DEFECTO
  fecha: Date = new Date()
  estado: boolean = Constants.ESTADO_POR_DEFECTO
  expresionOral: ExpresionOral = new ExpresionOral()
  expresionEscrita: ExpresionEscrita = new ExpresionEscrita()
  comprensionLectora: ComprensionLectora = new ComprensionLectora()
  comprensionAuditiva: ComprensionAuditiva = new ComprensionAuditiva()

  constructor() {}

  crearActa(
    lenguaje: string,
    tipo: string,
    fecha: Date,
    estado: boolean,
    puntuacionMaximaParteExpresionEscrita: number,
    puntuacionMaximaParteExpresionOral: number,
    puntuacionMaximaParteComprensionLectora: number,
    puntuacionMaximaParteComprensionAuditiva: number,
  ) {
    this.lenguaje = lenguaje
    this.tipo = tipo
    this.fecha = fecha
    this.estado = estado
    this.expresionEscrita.crearExpresionEscrita(
      puntuacionMaximaParteExpresionEscrita,
    )
    this.expresionOral.crearExpresionOral(puntuacionMaximaParteExpresionOral)
    this.comprensionLectora.crearComprensionLectora(
      puntuacionMaximaParteComprensionLectora,
    )
    this.comprensionAuditiva.crearComprensionAuditiva(
      puntuacionMaximaParteComprensionAuditiva,
    )
  }

  cargarActa(
    lenguaje: string,
    tipo: string,
    fecha: Date,
    estado: boolean,
    expresionEscrita: ExpresionEscrita,
    expresionOral: ExpresionOral,
    comprensionLectora: ComprensionLectora,
    comprensionAuditiva: ComprensionAuditiva,
    idActa: string,
  ) {
    if (idActa) this.idActa = idActa
    this.lenguaje = lenguaje
    this.tipo = tipo
    this.fecha = fecha
    this.estado = estado
    this.expresionEscrita = expresionEscrita
      ? expresionEscrita
      : this.expresionEscrita
    this.expresionOral = expresionOral ? expresionOral : this.expresionOral
    this.comprensionLectora = comprensionLectora
      ? comprensionLectora
      : this.comprensionLectora
    this.comprensionAuditiva = comprensionAuditiva
      ? comprensionAuditiva
      : this.comprensionAuditiva
  }

  corregirActa(acta?: Partial<Acta>) {
    Object.assign(this, acta)
  }

  public get porcentajeComprensionLectora() {
    return this.comprensionLectora.calcularPorcentaje()
  }
  public get pesoComprensionLectora() {
    return this.comprensionLectora.puntuacionMaximaParte
  }
  public get pesoComprensionAuditiva() {
    return this.comprensionAuditiva.puntuacionMaximaParte
  }
  public get pesoExpresionEscrita() {
    return this.expresionEscrita.puntuacionMaximaParte
  }
  public get pesoExpresionOral() {
    return this.expresionOral.puntuacionMaximaParte
  }
}
