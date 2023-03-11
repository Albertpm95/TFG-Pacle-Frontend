import { Tarea } from './tareaExpresion'
import { Usuario } from './usuario'


export interface ExpresionEscrita {
  observaciones: string
  puntuacionMaximaParte: number
  porcentaje: number
  puntosConseguidos: number
  listaTareas: Tarea[]
  corrector: Usuario
}
