import { CONSTANTS } from 'app/constants'
import { TareaExpresion } from './tareaExpresion'

export class ExpresionEscrita {
  tarea1: TareaExpresion = new TareaExpresion()
  tarea2: TareaExpresion = new TareaExpresion()
  observaciones: string = ''
  puntuacionMaximaParte: number = CONSTANTS.VALOR_PUNTUACION_MAX_DEFECTO
  porcentaje: number = CONSTANTS.VALOR_TAREA_DEFECTO
  puntosConseguidos: number = CONSTANTS.VALOR_TAREA_DEFECTO


  crearExpresion(puntuacionMaximaParte: number) {
    this.puntuacionMaximaParte = puntuacionMaximaParte
      ? puntuacionMaximaParte
      : this.puntuacionMaximaParte
  }

  actualizarExpresion(
    tarea1: TareaExpresion,
    tarea2: TareaExpresion,
    observaciones: string,
  ) {
    this.tarea1 = tarea1
    this.tarea2 = tarea2
    this.observaciones = observaciones
    this.porcentaje = this.calcularPorcentaje()
  }

  public calcularPuntosConseguidos() {
    this.puntosConseguidos =
      this.tarea1.calcularTotalPuntosConseguidos() +
      this.tarea2.calcularTotalPuntosConseguidos()
    return this.puntosConseguidos
  }

  public calcularPorcentaje(): number {
    return (
      (this.calcularPuntosConseguidos() / this.puntuacionMaximaParte) *
      CONSTANTS.PORCIENTO
    )
  }
}
