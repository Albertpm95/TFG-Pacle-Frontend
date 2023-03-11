import { Tarea } from './tareaExpresion'
import { Usuario } from './usuario'


export interface ExpresionEscrita {
  id_expresion_escrita?: number
  observaciones: string
  puntuacionMaximaParte: number
  porcentaje: number
  puntosConseguidos: number
  listaTareas: Tarea[]
  corrector: Usuario
}
