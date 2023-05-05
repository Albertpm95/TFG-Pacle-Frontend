import { Correccion, Tarea } from './correccion'

export interface ParteNueva {
  tipo: string
  puntuacionMaxima: number
  tareas: Tarea[]
}
export interface Parte {
  idParte: number
  tipo: string
  puntuacionMaxima: number
  tareas: Tarea[]
}
export interface ParteCorregidaNueva {
  parte: Parte
  observaciones: string
  correccion: Correccion
  correccion2?: Correccion
  puntosConseguidos: number
  porcentaje: number
}

export interface ParteCorregidaDB {
  parte: Parte
  observaciones: string
  correccion: Correccion
  correccion2?: Correccion
  puntosConseguidos: number
  idParte: number
  porcentaje: number
}