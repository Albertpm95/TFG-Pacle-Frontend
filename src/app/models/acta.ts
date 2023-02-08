import { Constants } from 'app/constants';
import { ComprensionAuditiva } from './comprensionAuditiva';
import { ComprensionLectora } from './comprensionLectora';
import { ExpresionEscrita } from './expresionEscrita';
import { ExpresionOral } from './expresionOral';

export class Acta {
  idActa?: string;
  lenguaje?: string;
  tipo?: string;
  fecha?: Date;
  activa?: boolean;
  expresionOral: ExpresionOral;
  expresionEscrita: ExpresionEscrita;
  comprensionLectora: ComprensionLectora;
  comprensionAuditiva: ComprensionAuditiva;

  constructor(
    lenguaje?: string,
    tipo?: string,
    fecha?: Date,
    activa?: boolean,
    expresionEscrita?: ExpresionEscrita,
    expresionOral?: ExpresionOral,
    comprensionLectora?: ComprensionLectora,
    comprensionAuditiva?: ComprensionAuditiva,
    idActa?: string
  ) {
    if (idActa) this.idActa = idActa;
    this.lenguaje = lenguaje ? lenguaje : Constants.LENGUAJE_POR_DEFECTO;
    this.tipo = tipo ? tipo : Constants.TIPO_POR_DEFECTO;
    this.fecha = fecha ? fecha : new Date();
    this.activa = activa ? activa : true;
    this.expresionEscrita = expresionEscrita
      ? expresionEscrita
      : new ExpresionEscrita();
    this.expresionOral = expresionOral ? expresionOral : new ExpresionOral();
    this.comprensionLectora = comprensionLectora
      ? comprensionLectora
      : new ComprensionLectora();
    this.comprensionAuditiva = comprensionAuditiva
      ? comprensionAuditiva
      : new ComprensionAuditiva();
  }
}
