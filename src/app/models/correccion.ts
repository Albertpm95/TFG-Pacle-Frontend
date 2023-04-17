import { Usuario } from './usuario'

export interface Tarea {
  idTarea: number
  nombreTarea: string
}
export interface TareaCorregida extends Tarea {
  puntuacion: number
}
export interface Correccion {
  corrector: Usuario
  tareasCorregidas: TareaCorregida[]
}
