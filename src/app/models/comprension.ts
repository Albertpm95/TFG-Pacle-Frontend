import { Constants } from 'app/constants'

export class Comprension {
  puntuacionMaximaParte: number = Constants.VALOR_PUNTUACION_MAX_DEFECTO
  puntuacionTarea1: number = Constants.VALOR_PUNTUACION_MAX_DEFECTO
  puntuacionTarea2: number = Constants.VALOR_PUNTUACION_MAX_DEFECTO
  puntuacionTarea3: number = Constants.VALOR_PUNTUACION_MAX_DEFECTO
  puntosConseguidos: number = Constants.VALOR_TAREA_DEFECTO
  observaciones: string = ''
  porcentaje: number = Constants.VALOR_TAREA_DEFECTO
  tipo: string = ''

  public crearComprension(puntuacionMaximaParte: number): void {
    this.puntuacionMaximaParte = puntuacionMaximaParte ?? this.puntuacionMaximaParte
  }

  public actualizarComprension(puntuacion_tarea1: number, puntuacion_tarea2: number, puntuacion_tarea3: number, observaciones: string): void {
    this.puntuacionTarea1 = puntuacion_tarea1 ?? this.puntuacionTarea1
    this.puntuacionTarea1 = puntuacion_tarea2 ?? this.puntuacionTarea1
    this.puntuacionTarea1 = puntuacion_tarea3 ?? this.puntuacionTarea1
    this.observaciones = observaciones ?? this.observaciones
  }

  public calcularPuntosConseguidos(): number {
    this.puntosConseguidos = this.puntuacionTarea1 + this.puntuacionTarea2 + this.puntuacionTarea3
    return this.puntosConseguidos
  }

  public calcularPorcentaje(): number {
    this.porcentaje = (this.calcularPuntosConseguidos() / this.puntuacionMaximaParte) * Constants.PORCIENTO
    return this.porcentaje
  }
}
