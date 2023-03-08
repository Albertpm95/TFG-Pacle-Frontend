import { CONSTANTS } from 'app/constants';

export class TareaExpresion {
  alcance: number = CONSTANTS.VALOR_TAREA_DEFECTO;
  coherencia: number = CONSTANTS.VALOR_TAREA_DEFECTO;
  correccion: number = CONSTANTS.VALOR_TAREA_DEFECTO;
  eficaciaC: number = CONSTANTS.VALOR_TAREA_DEFECTO;
  id_corrector?: string;
  nombre_corrector: string = CONSTANTS.NOMBRE_CORRECTOR_DEFECTO;

  actualizarTareaExpresion(
    alcance: number,
    coherencia: number,
    correccion: number,
    eficaciaC: number,
    id_corrector: string,
    nombre_corrector: string
  ) {
    this.alcance = alcance;
    this.coherencia = coherencia;
    this.correccion = correccion;
    this.eficaciaC = eficaciaC;
    this.id_corrector = id_corrector;
    this.nombre_corrector = nombre_corrector;
  }

  public calcularTotalPuntosConseguidos(): number {
    return this.eficaciaC + this.coherencia + this.alcance + this.correccion;
  }
}
