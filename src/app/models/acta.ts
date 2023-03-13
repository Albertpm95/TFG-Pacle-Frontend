import { Alumno } from './alumno'
import { ComprensionAuditiva } from './comprension_auditiva'
import { ComprensionLectora } from './comprension_lectora'
import { Convocatoria } from './convocatoria'
import { ExpresionEscrita } from './expresion_escrita'
import { ExpresionOral } from './expresion_oral'
import { Usuario } from './usuario'


export interface Acta {
  alumno: Alumno
  comprension_auditiva: ComprensionAuditiva
  comprension_lectora: ComprensionLectora
  convocatoria: Convocatoria
  corrector: Usuario
  expresion_escrita: ExpresionEscrita
  expresion_oral: ExpresionOral
  id_acta?: number
  resultado: string
  resultado_bloque_lectoescritura: number
  resultado_bloque_destrezas_orales: number
  resultado_global: number
}
