import { Tarea } from './tareaExpresion'
import { Usuario } from './usuario'

export interface ComprensionLectora {
  puntuacionMaximaParte: number
  listaTareas: Tarea[]
  puntosConseguidos: number
  observaciones: string
  porcentaje: number
  corrector: Usuario
}
