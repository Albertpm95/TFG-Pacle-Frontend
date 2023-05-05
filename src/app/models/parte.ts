import { Correccion, Tarea } from './correccion'

export class Parte {
  idParte?: number
  tipo: string = ''
  puntuacionMaxima: number = 0
  tareas: Tarea[] = []
}

export interface ParteCorregida {
  parte: Parte
  observaciones?: string
  correccion?: Correccion
  correccion2?: Correccion
  puntosConseguidos: number
  idParteCorregida?: number
  porcentaje?: number
}
