import { Constants } from 'app/constants';

export class TareaExpresion {
  alcance: number;
  coherencia: number;
  correccion: number;
  eficaciaC: number;
  id_corrector: string;
  nombre_corrector: string;

  constructor(
    alcance?: number,
    coherencia?: number,
    correccion?: number,
    eficaciaC?: number,
    id_corrector?: string,
    nombre_corrector?: string
  ) {
    this.alcance = alcance ? alcance : Constants.VALOR_TAREA_DEFECTO;
    this.coherencia = coherencia ? coherencia : Constants.VALOR_TAREA_DEFECTO;
    this.correccion = correccion ? correccion : Constants.VALOR_TAREA_DEFECTO;
    this.eficaciaC = eficaciaC ? eficaciaC : Constants.VALOR_TAREA_DEFECTO;
    this.id_corrector = id_corrector ? id_corrector : '';
    this.nombre_corrector = nombre_corrector ? nombre_corrector : '';
  }

  public calcularTotalPuntosConseguidos(): number {
    return this.eficaciaC + this.coherencia + this.alcance + this.correccion;
  }
}
