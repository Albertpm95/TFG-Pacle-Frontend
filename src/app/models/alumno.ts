import { ColectivoUV } from './colectivouv'
import { Direccion } from './direccion'
import { Genero } from './genero'

export interface Alumno {
  idAlumno?: number
  dni: string
  nombre: string
  apellidos: string
  direccion: Direccion
  email: string
  telefono: number
  genero: Genero
  fechaNacimiento: Date
  colectivoUV: ColectivoUV
  pruebaAdaptada: boolean
}
