import { Usuario } from "./usuario"

export interface Tarea {
  idTarea: number
  nombreTarea: string
  valor: number
}

export interface TareaExpresion {
  corrector: Usuario
  listaTareas: Tarea[]
}
