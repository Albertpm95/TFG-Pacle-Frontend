import { Tarea } from './tarea'
import { Usuario } from './usuario'

export interface ComprensionLectora {
  corrector: Usuario
  idComprensionLectora?: number
  listaTareas: Tarea[]
  observaciones: string
  porcentaje: number
  puntosConseguidos: number
  puntuacionMaxima: number
}
