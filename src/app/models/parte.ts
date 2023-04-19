import { Correccion, Tarea } from './correccion'

export interface Parte {
  idParte?: number
  tipo: string
  puntuacionMaxima: number
  tareas: Tarea[]
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
