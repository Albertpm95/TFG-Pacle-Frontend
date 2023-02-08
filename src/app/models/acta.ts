export class ComprensionLectora {
  puntuacionMaximaParte: number;
  tarea1: number;
  tarea2: number;
  tarea3: number;
  observaciones: string;
  puntuacionTotal: number;
  porcentaje: number;

  constructor(expresionOralJSON?: any) {
    this.tarea1 = expresionOralJSON.tarea1 ? expresionOralJSON.tarea1 : 0;
    this.tarea2 = expresionOralJSON.tarea2 ? expresionOralJSON.tarea1 : 0;
    this.tarea3 = expresionOralJSON.tarea3 ? expresionOralJSON.tarea1 : 0;
    this.puntuacionMaximaParte = expresionOralJSON.puntuacionMaximaParte ? expresionOralJSON.puntuacionMaximaParte : 0;
    this.observaciones = expresionOralJSON.observaciones ? expresionOralJSON.observaciones : '';
    this.puntuacionTotal = expresionOralJSON.puntuacionTotal ? expresionOralJSON.puntuacionTotal : this.calcularPuntosConseguidos();
    this.porcentaje = expresionOralJSON.porcentaje ? expresionOralJSON.porcentaje : this.calcularPorcentaje();
  }
  private calcularPuntosConseguidos() {
    return (this.tarea1 + this.tarea2 + this.tarea3);
  }
  private calcularPorcentaje() {
    return ((this.calcularPuntosConseguidos() / this.puntuacionMaximaParte) * 100).toFixed(2);
  }
}
export class ComprensionAuditiva {
  puntuacionMaximaParte: number;
  tarea1: number;
  tarea2: number;
  tarea3: number;
  observaciones: string;
  puntuacionTotal: number;
  porcentaje: number;

  constructor(expresionOralJSON?: any) {
    this.tarea1 = expresionOralJSON.tarea1 ? expresionOralJSON.tarea1 : 0;
    this.tarea2 = expresionOralJSON.tarea2 ? expresionOralJSON.tarea1 : 0;
    this.tarea3 = expresionOralJSON.tarea3 ? expresionOralJSON.tarea1 : 0;
    this.puntuacionMaximaParte = expresionOralJSON.puntuacionMaximaParte ? expresionOralJSON.puntuacionMaximaParte : 0;
    this.observaciones = expresionOralJSON.observaciones ? expresionOralJSON.observaciones : '';
    this.puntuacionTotal = expresionOralJSON.puntuacionTotal ? expresionOralJSON.puntuacionTotal : this.calcularPuntosConseguidos();
    this.porcentaje = expresionOralJSON.porcentaje ? expresionOralJSON.porcentaje : this.calcularPorcentaje();
  }

  private calcularPuntosConseguidos() {
    return (this.tarea1 + this.tarea2 + this.tarea3);
  }

  private calcularPorcentaje() {
    return ((this.calcularPuntosConseguidos() / this.puntuacionMaximaParte) * 100).toFixed(2);
  }
}
class TareaExpresion {
  eficaciaC: number;
  coherencia: number;
  alcance: number;
  correccion: number;
  nombre_corrector: string;
  id_corrector: string;

  constructor(tareaExpresionJSON?: any) {
    this.eficaciaC = tareaExpresionJSON.eficaciaC ? tareaExpresionJSON.eficaciaC : 0;
    this.coherencia = tareaExpresionJSON.coherencia ? tareaExpresionJSON.coherencia : 0;
    this.alcance = tareaExpresionJSON.alcance ? tareaExpresionJSON.alcance : 0;
    this.correccion = tareaExpresionJSON.correccion ? tareaExpresionJSON.correccion : 0;
    this.nombre_corrector = tareaExpresionJSON.nombre_corrector ? tareaExpresionJSON.nombre_corrector : '';
    this.id_corrector = tareaExpresionJSON.id_corrector ? tareaExpresionJSON.id_corrector : '';
  }

  public calcularPuntosConseguidos(): number {
    return (this.eficaciaC + this.coherencia + this.alcance + this.correccion);
  }

}
export class ExpresionEscrita {
  tarea1: TareaExpresion;
  tarea2: TareaExpresion;
  observaciones: string;
  puntuacionTotal: number;
  porcentaje: number;
  puntuacionMaximaParte: number;

  constructor(expresionEscritaJSON?: any) {
    this.tarea1 = expresionEscritaJSON.tarea1 ? expresionEscritaJSON.tarea1 : new TareaExpresion();
    this.tarea2 = expresionEscritaJSON.tarea2 ? expresionEscritaJSON.tarea2 : new TareaExpresion();
    this.tarea2 = expresionEscritaJSON.tarea2 ? expresionEscritaJSON.tarea2 : new TareaExpresion();
    this.puntuacionMaximaParte = expresionEscritaJSON.puntuacionMaximaParte ? expresionEscritaJSON.puntuacionMaximaParte : 0;
    this.observaciones = expresionEscritaJSON.observaciones ? expresionEscritaJSON.observaciones : '';
    this.puntuacionTotal = expresionEscritaJSON.puntuacionTotal ? expresionEscritaJSON.puntuacionTotal : this.calcularPuntosConseguidos();
    this.porcentaje = expresionEscritaJSON.porcentaje ? expresionEscritaJSON.porcentaje : this.calcularPorcentaje();
  }

  private calcularPuntosConseguidos() {
    return (this.tarea1.calcularPuntosConseguidos() + this.tarea2.calcularPuntosConseguidos());
  }

  private calcularPorcentaje() {
    return ((this.calcularPuntosConseguidos() / this.puntuacionMaximaParte) * 100).toFixed(2);
  }
}
export class ExpresionOral {
  tarea1: TareaExpresion;
  tarea2: TareaExpresion;
  observaciones: string;
  puntuacionTotal: number;
  porcentaje: number;
  puntuacionMaximaParte: number;

  constructor(expresionOralJSON?: any) {
    this.tarea1 = expresionOralJSON.tarea1 ? expresionOralJSON.tarea1 : new TareaExpresion();
    this.tarea2 = expresionOralJSON.tarea2 ? expresionOralJSON.tarea2 : new TareaExpresion();
    this.tarea2 = expresionOralJSON.tarea2 ? expresionOralJSON.tarea2 : new TareaExpresion();
    this.puntuacionMaximaParte = expresionOralJSON.puntuacionMaximaParte ? expresionOralJSON.puntuacionMaximaParte : 0;
    this.observaciones = expresionOralJSON.observaciones ? expresionOralJSON.observaciones : '';
    this.puntuacionTotal = expresionOralJSON.puntuacionTotal ? expresionOralJSON.puntuacionTotal : this.calcularPuntosConseguidos();
    this.porcentaje = expresionOralJSON.porcentaje ? expresionOralJSON.porcentaje : this.calcularPorcentaje();
  }

  private calcularPuntosConseguidos() {
    return (this.tarea1.calcularPuntosConseguidos() + this.tarea2.calcularPuntosConseguidos());
  }

  private calcularPorcentaje() {
    return ((this.calcularPuntosConseguidos() / this.puntuacionMaximaParte) * 100).toFixed(2);
  }

}
export class Acta {
  idActa?: string;
  lenguaje: 'Español' | 'English' | 'Català' | 'Français' | 'Chainese' | 'Deutsch';
  tipo: 'Ordinaria' | 'Extraordinaria';
  fecha: Date;
  activa: boolean;
  expresionOral: ExpresionOral;
  expresionEscrita: ExpresionEscrita;
  comprensionLectora: ComprensionLectora;
  comprensionAuditiva: ComprensionAuditiva;

  constructor(actaJSON?: any) {
    if (actaJSON.idActa)
      this.idActa = actaJSON.idActa;
    this.lenguaje = actaJSON.lenguaje ? actaJSON.lenguaje : 'Español';
    this.tipo = actaJSON.tipo ? actaJSON.tipo : 'Ordinaria';
    this.fecha = actaJSON.fecha ? actaJSON.fecha : Date.now();
    this.activa = actaJSON.activa ? actaJSON.activa : true;
    this.expresionEscrita = actaJSON.expresionEscrita ? actaJSON.expresionEscrita : new ExpresionEscrita();
    this.expresionOral = actaJSON.expresionOral ? actaJSON.expresionOral : new ExpresionOral();
    this.comprensionLectora = actaJSON.comprensionLectora ? actaJSON.comprensionLectora : new ComprensionLectora();
    this.comprensionAuditiva = actaJSON.comprensionAuditiva ? actaJSON.comprensionAuditiva : new ComprensionAuditiva();
  }
}