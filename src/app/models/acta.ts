import { Constants } from 'app/constants'
import { Alumno } from './alumno'
import { ComprensionAuditiva } from './comprensionAuditiva'
import { ComprensionLectora } from './comprensionLectora'
import { ConvocatoriaNueva } from './convocatoriaNueva'
import { ExpresionEscrita } from './expresionEscrita'
import { ExpresionOral } from './expresionOral'

export class Acta {
  alumno: Alumno = {DNI:'', apellidos:'', nombre:'', id_alumno:''}
  comprensionAuditiva: ComprensionAuditiva = new ComprensionAuditiva()
  comprensionLectora: ComprensionLectora = new ComprensionLectora()
  convocatoria: ConvocatoriaNueva = new ConvocatoriaNueva()
  expresionEscrita: ExpresionEscrita = new ExpresionEscrita()
  expresionOral: ExpresionOral = new ExpresionOral()
  id_acta?: string

  constructor() {}

  crearActa(
    alumno: Alumno,
    convocatoria: ConvocatoriaNueva,

  ) {
    console.log('Creacion de un acta: ')
  }

  cargarActa(
    expresionEscrita: ExpresionEscrita,
    expresionOral: ExpresionOral,
    comprensionLectora: ComprensionLectora,
    comprensionAuditiva: ComprensionAuditiva,
    id_acta: string,
  ) {
    if (id_acta) this.id_acta = id_acta
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
