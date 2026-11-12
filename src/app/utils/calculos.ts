import { APORTE_MENSUAL } from '../config';
import { Integrante, Resumen } from '../models/integrante';

export const mesesPendientes = (i: Integrante): number => 12 - i.pagados;
export const aportePagado = (i: Integrante): number => i.pagados * APORTE_MENSUAL;
export const deudaTotal = (i: Integrante): number => mesesPendientes(i) * APORTE_MENSUAL + i.multaDebe;
export const estaAlDia = (i: Integrante): boolean => i.pagados === 12 && i.multaDebe === 0;

export function calcularResumen(integrantes: Integrante[]): Resumen {
  return integrantes.reduce<Resumen>(
    (acc, i) => ({
      recaudado: acc.recaudado + aportePagado(i) + i.multaPagada,
      pendiente: acc.pendiente + deudaTotal(i),
      alDia: acc.alDia + (estaAlDia(i) ? 1 : 0),
      total: acc.total + 1,
    }),
    { recaudado: 0, pendiente: 0, alDia: 0, total: 0 },
  );
}
