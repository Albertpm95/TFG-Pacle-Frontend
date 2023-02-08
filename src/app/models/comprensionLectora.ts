import { Constants } from 'app/constants';

export class ComprensionLectora {
  puntuacionMaximaParte: number;
  tarea1: number;
  tarea2: number;
  tarea3: number;
  observaciones: string;

  constructor(
    puntuacionMaximaParte?: number,
    tarea1?: number,
    tarea2?: number,
    tarea3?: number,
    observaciones?: string
  ) {
    this.puntuacionMaximaParte = puntuacionMaximaParte
      ? puntuacionMaximaParte
      : Constants.VALOR_PUNTUACION_MAX_DEFECTO;
    this.tarea1 = tarea1 ? tarea1 : Constants.VALOR_TAREA_DEFECTO;
    this.tarea2 = tarea2 ? tarea2 : Constants.VALOR_TAREA_DEFECTO;
    this.tarea3 = tarea3 ? tarea3 : Constants.VALOR_TAREA_DEFECTO;
    this.observaciones = observaciones ? observaciones : '';
  }

  private calcularPuntosConseguidos() {
    return this.tarea1 + this.tarea2 + this.tarea3;
  }

  private calcularPorcentaje(): number {
    return (
      (this.calcularPuntosConseguidos() / this.puntuacionMaximaParte) *
      Constants.PORCIENTO
    );
  }
}
