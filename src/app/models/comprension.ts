import { Correccion, Tarea } from './correccion'

export interface ComprensionConvocatoria {
  puntuacionMaxima: number
  listaTareas: Tarea[]
}
export interface Comprension {
  idComprension?: number
  correccion: Correccion
  observaciones: string
  porcentaje: number
  puntosConseguidos: number
  puntuacionMaxima: number
  tipo: string
}
