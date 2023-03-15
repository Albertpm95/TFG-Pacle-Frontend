import { Genero } from "./genero"

export interface Alumno {
  idAlumno?: number
  dni: string
  nombre: string
  apellidos: string
  direccion: string
  email: string
  telefono: number
  genero: Genero
  fechaNacimiento: Date
  colectivoUV: string
  pruebaAdatada: boolean
}