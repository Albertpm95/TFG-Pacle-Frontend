import { Usuario } from './usuario'

export class Tarea {
  idTarea?: number
  nombreTarea: string
  idParte?: number

  constructor(nombreTarea: string) {
    this.nombreTarea = nombreTarea
  }
}
export class TareaCorregida {
  puntuacion = 0
  tarea: Tarea
  idParte?: number

  constructor(tarea: Tarea, puntuacion: number) {
    this.tarea = tarea
    this.puntuacion = puntuacion
  }
}
export interface Correccion {
  corrector?: Usuario
  tareasCorregidas: TareaCorregida[]
}
