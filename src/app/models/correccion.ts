import { Usuario } from './usuario'

export class Tarea {
  idTarea?: number
  nombreTarea: string

  constructor(nombreTarea: string) {
    this.nombreTarea = nombreTarea
  }
}
export class TareaCorregida {
  puntuacion = 0
  tarea: Tarea

  constructor(tarea: Tarea, puntuacion: number) {
    this.tarea = tarea
    this.puntuacion = puntuacion
  }
}
export interface Correccion {
  corrector?: Usuario
  tareasCorregidas: TareaCorregida[]
}
