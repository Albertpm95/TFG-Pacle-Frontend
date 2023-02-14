import { Constants } from 'app/constants'
import { TareaExpresion } from './tareaExpresion'

export class ExpresionOral {
  tarea1: TareaExpresion = new TareaExpresion()
  tarea2: TareaExpresion = new TareaExpresion()
  observaciones: string = ''
  puntuacionMaximaParte: number = Constants.VALOR_PUNTUACION_MAX_DEFECTO
  porcentaje: number = Constants.VALOR_TAREA_DEFECTO
  puntosConseguidos: number = Constants.VALOR_TAREA_DEFECTO

  crearExpresionOral(puntuacionMaximaParte: number) {
    this.puntuacionMaximaParte = puntuacionMaximaParte
      ? puntuacionMaximaParte
      : this.puntuacionMaximaParte
  }

  actualizarExpresionOral(
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
      Constants.PORCIENTO
    )
  }
}
