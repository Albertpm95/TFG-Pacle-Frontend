import { Constants } from 'app/constants';

export class TareaExpresion {
  alcance: number = Constants.VALOR_TAREA_DEFECTO;
  coherencia: number = Constants.VALOR_TAREA_DEFECTO;
  correccion: number = Constants.VALOR_TAREA_DEFECTO;
  eficaciaC: number = Constants.VALOR_TAREA_DEFECTO;
  id_corrector?: string;
  nombre_corrector: string = Constants.VALOR_CORRECTOR_DEFECTO;

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
