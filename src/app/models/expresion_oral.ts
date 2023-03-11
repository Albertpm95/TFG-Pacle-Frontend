import { Tarea } from "./tareaExpresion"
import { Usuario } from "./usuario"


export interface ExpresionOral {
  id_expresion_oral?: number
  observaciones: string
  puntuacionMaximaParte: number
  porcentaje: number
  puntosConseguidos: number
  listaTareas: Tarea[]
  corrector: Usuario
}
