export interface Acta {
  id_acta: string;
  lenguaje: 'Español' | 'English' | 'Català' | 'Français' | 'Chainese' | 'Deutsch';
  tipo: 'Ordinaria' | 'Extraordinaria';
  fecha: Date;
  activa: boolean;
}