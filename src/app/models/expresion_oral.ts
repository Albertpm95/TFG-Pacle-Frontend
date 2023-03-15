import { TareaExpresion } from "./tarea"


export interface ExpresionOral {
  idExpresionOral?: number
  tareasCorrector1: TareaExpresion
  tareasCorrector2: TareaExpresion
  observaciones: string
  porcentaje: number
  puntosConseguidos: number
  puntuacionMaxima: number
}
