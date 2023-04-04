import { Alumno } from "./alumno";
import { Convocatoria } from "./convocatoria";

export interface AlumnosConvocatoria {
    convocatoria: Convocatoria
    alumnos: Alumno[]
}