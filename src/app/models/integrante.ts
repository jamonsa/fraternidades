export type TipoMes = 'ok' | 'debt' | 'fine';

export interface DetalleMes {
  nombre: string;
  texto: string;
  tipo: TipoMes;
}

export interface Integrante {
  id: number;
  nombre: string;
  pagados: number;
  multaPagada: number;
  multaDebe: number;
  detalleMeses: DetalleMes[];
}

export interface Resumen {
  recaudado: number;
  pendiente: number;
  alDia: number;
  total: number;
}
