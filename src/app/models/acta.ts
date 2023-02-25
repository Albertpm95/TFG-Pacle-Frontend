import { Constants } from '@constants'
import { Alumno } from './alumno'
import { Comprension } from './comprension'
import { Convocatoria } from './convocatoria'
import { Expresion } from './expresion'

export class Acta {
  alumno: Alumno = { DNI: '', apellidos: '', nombre: '', id_alumno: '' }
  comprension: Comprension = new Comprension()
  convocatoria: Convocatoria = new Convocatoria()
  expresion: Expresion = new Expresion()
  id_acta?: string
  resultado: string = Constants.RESULTADO_ACTA

  public cargarActa(alumno: Alumno, convocatoria: Convocatoria, expresion: Expresion, comprension: Comprension, id_acta: string): void {
    if (id_acta) this.id_acta = id_acta
    this.alumno = alumno ?? this.alumno
    this.convocatoria = convocatoria ?? this.convocatoria
    this.expresion = expresion ?? this.expresion
    this.comprension = comprension ?? this.comprension
  }

  public corregirActa(acta?: Partial<Acta>): void {
    Object.assign(this, acta)
  }
}
