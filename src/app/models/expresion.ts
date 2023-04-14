import { Correccion, Tarea } from './correccion'

export interface ExpresionConvocatoria {
  puntuacionMaxima: number
  listaTareas: Tarea[]
}

export interface Expresion {
  idExpresion?: number
  correccion1: Correccion
  correccion2: Correccion
  observaciones: string
  porcentaje: number
  puntosConseguidos: number
  puntuacionMaxima: number
  tipo: string
}
