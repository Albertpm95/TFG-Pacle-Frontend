import { CONSTANTS } from '@constants'
import { Alumno } from './alumno'
import { ComprensionAuditiva } from './comprension_auditiva'
import { ComprensionLectora } from './comprension_lectora'
import { Convocatoria } from './convocatoria'
import { ExpresionEscrita } from './expresion_escrita'
import { ExpresionOral } from './expresion_oral'


export class Acta {
  alumno: Alumno | undefined
  comprensionAuditiva: ComprensionAuditiva = new ComprensionAuditiva()
  comprensionLectora: ComprensionLectora = new ComprensionLectora()
  convocatoria: Convocatoria = new Convocatoria()
  expresionEscrita: ExpresionEscrita = new ExpresionEscrita()
  expresionOral: ExpresionOral = new ExpresionOral()
  id_acta?: string
  resultado: string = CONSTANTS.RESULTADO_ACTA

  public cargarActa(alumno: Alumno, convocatoria: Convocatoria, expresionEscrita: ExpresionEscrita, expresionOral: ExpresionOral, comprensionLectora: ComprensionLectora, comprensionAuditiva: ComprensionAuditiva, id_acta: string): void {
    if (id_acta) this.id_acta = id_acta
    this.alumno = alumno
    this.convocatoria = convocatoria ?? this.convocatoria
    this.expresionEscrita = expresionEscrita ?? this.expresionEscrita
    this.expresionOral = expresionOral ?? this.expresionOral
    this.comprensionAuditiva = comprensionAuditiva ?? this.comprensionAuditiva
    this.comprensionLectora = comprensionLectora ?? this.comprensionLectora
  }

  public corregirActa(acta?: Partial<Acta>): void {
    Object.assign(this, acta)
  }
}
