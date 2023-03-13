import { TareaExpresion } from './tarea'


export interface ExpresionEscrita {
  id_expresion_escrita?: number
  tareas_corrector_1: TareaExpresion
  tareas_corrector_2: TareaExpresion
  observaciones: string
  porcentaje: number
  puntos_conseguidos: number
  puntuacion_maxima: number
}
