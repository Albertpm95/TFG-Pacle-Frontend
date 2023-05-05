import { Alumno } from './alumno'
import { ConvocatoriaDB } from './convocatoria'

export interface AlumnosConvocatoria {
  convocatoria: ConvocatoriaDB
  alumnos: Alumno[]
}
