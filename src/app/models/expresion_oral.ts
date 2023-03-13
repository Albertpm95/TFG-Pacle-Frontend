import { TareaExpresion } from "./tarea"


export interface ExpresionOral {
  id_expresion_oral?: number
  tareas_corrector_1: TareaExpresion
  tareas_corrector_2: TareaExpresion
  observaciones: string
  porcentaje: number
  puntos_conseguidos: number
  puntuacion_maxima: number
}
