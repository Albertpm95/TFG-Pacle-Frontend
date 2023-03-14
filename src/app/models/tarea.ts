import { Usuario } from "./usuario"

export interface Tarea {
  id_tarea: number
  nombreTarea: string
  valor: number
}

export interface TareaExpresion {
  corrector: Usuario
  lista_tareas: Tarea[]
}
