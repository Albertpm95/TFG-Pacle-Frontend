import { Usuario } from './usuario'

export interface Tarea {
  idTarea: number
  nombreTarea: string
  valor: number
}

export interface Correccion {
  corrector: Usuario
  listaTareas: Tarea[]
}
