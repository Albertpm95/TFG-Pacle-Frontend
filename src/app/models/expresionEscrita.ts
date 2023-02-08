import { Constants } from 'app/constants';
import { TareaExpresion } from './tareaExpresion';

export class ExpresionEscrita {
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
    this.tarea2 = tarea2 ? tarea2 : new TareaExpresion();
    this.puntuacionMaximaParte = puntuacionMaximaParte
      ? puntuacionMaximaParte
      : Constants.VALOR_PUNTUACION_MAX_DEFECTO;
    this.observaciones = observaciones ? observaciones : '';
  }

  public calcularPuntosConseguidos() {
    return (
      this.tarea1.calcularTotalPuntosConseguidos() +
      this.tarea2.calcularTotalPuntosConseguidos()
    );
  }

  public calcularPorcentaje() {
    return (
      (this.calcularPuntosConseguidos() / this.puntuacionMaximaParte) *
      100
    ).toFixed(2);
  }
}
