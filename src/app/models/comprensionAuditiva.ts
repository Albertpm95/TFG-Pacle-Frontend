import { Constants } from 'app/constants';

export class ComprensionAuditiva {
  puntuacionMaximaParte: number = Constants.VALOR_PUNTUACION_MAX_DEFECTO;
  puntuacion_tarea1: number = Constants.VALOR_PUNTUACION_MAX_DEFECTO;
  puntuacion_tarea2: number = Constants.VALOR_PUNTUACION_MAX_DEFECTO;
  puntuacion_tarea3: number = Constants.VALOR_PUNTUACION_MAX_DEFECTO;
  puntosConseguidos: number = Constants.VALOR_TAREA_DEFECTO;
  observaciones: string = '';

  crearComprensionAuditiva(puntuacionMaximaParte: number) {
    this.puntuacionMaximaParte = puntuacionMaximaParte
      ? puntuacionMaximaParte
      : this.puntuacionMaximaParte;
  }

  actualizarComprensionAuditiva(
    puntuacion_tarea1: number,
    puntuacion_tarea2: number,
    puntuacion_tarea3: number,
    observaciones: string
  ) {
    this.puntuacion_tarea1 = puntuacion_tarea1
      ? puntuacion_tarea1
      : this.puntuacion_tarea1;
    this.puntuacion_tarea1 = puntuacion_tarea2
      ? puntuacion_tarea2
      : this.puntuacion_tarea1;
    this.puntuacion_tarea1 = puntuacion_tarea3
      ? puntuacion_tarea3
      : this.puntuacion_tarea1;
    this.observaciones = observaciones ? observaciones : this.observaciones;
  }

  private calcularPuntosConseguidos() {
    this.puntosConseguidos =
      this.puntuacion_tarea1 + this.puntuacion_tarea2 + this.puntuacion_tarea3;
    return this.puntosConseguidos;
  }

  public calcularPorcentaje(): number {
    return (
      (this.calcularPuntosConseguidos() / this.puntuacionMaximaParte) *
      Constants.PORCIENTO
    );
  }
}
