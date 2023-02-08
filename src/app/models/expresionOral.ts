import { Constants } from 'app/constants';
import { TareaExpresion } from './tareaExpresion';

export class ExpresionOral {
  tarea1: TareaExpresion;
  tarea2: TareaExpresion;
  observaciones: string;
  puntuacionMaximaParte: number;

  constructor(
    tarea1: TareaExpresion,
    tarea2: TareaExpresion,
    observaciones: string,
    puntuacionMaximaParte: number
  ) {
    this.tarea1 = tarea1 ? tarea1 : new TareaExpresion();
    this.tarea2 = tarea2 ? tarea2 : new TareaExpresion();
    this.observaciones = observaciones ? observaciones : '';
    this.puntuacionMaximaParte = puntuacionMaximaParte
      ? puntuacionMaximaParte
      : Constants.VALOR_PUNTUACION_MAX_DEFECTO;
  }

  private calcularPuntosConseguidos() {
    return (
      this.tarea1.calcularTotalPuntosConseguidos() +
      this.tarea2.calcularTotalPuntosConseguidos()
    );
  }

  private calcularPorcentaje(): number {
    return (
      (this.calcularPuntosConseguidos() / this.puntuacionMaximaParte) *
      Constants.PORCIENTO
    );
  }
}
