import { APORTE_MENSUAL, NOMBRES_MESES } from '../config';
import { DetalleMes, Integrante, TipoMes } from '../models/integrante';

/** Separa una línea CSV respetando valores entre comillas. */
export function parseCSVLine(text: string): string[] {
  const result: string[] = [];
  let insideQuotes = false;
  let entry = '';
  for (const c of text) {
    if (c === '"') {
      insideQuotes = !insideQuotes;
    } else if (c === ',' && !insideQuotes) {
      result.push(entry);
      entry = '';
    } else {
      entry += c;
    }
  }
  result.push(entry);
  return result;
}

const limpiar = (valor: string | undefined): string => (valor ?? '').replace(/["']/g, '').trim();

/** Convierte "1.234,50" en 1234.5 */
function parseNumero(valor: string | undefined): number {
  return parseFloat(limpiar(valor || '0').replace(/\./g, '').replace(',', '.')) || 0;
}

/** Transforma el CSV de la hoja en la lista de integrantes. */
export function procesarCSV(text: string): Integrante[] {
  const integrantes: Integrante[] = [];

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    const cols = parseCSVLine(line);
    const idStr = limpiar(cols[0]);
    const nombre = limpiar(cols[1]);

    if (!idStr || isNaN(Number(idStr)) || !nombre || nombre.toUpperCase() === 'TOTAL') continue;

    let pagados = 0;
    let multaPagada = 0;
    let multaDebe = 0;
    const detalleMeses: DetalleMes[] = [];

    for (let m = 0; m < 12; m++) {
      const baseIdx = 2 + m * 3;
      const aporte = parseNumero(cols[baseIdx]);
      const mDebe = parseNumero(cols[baseIdx + 1]);
      const mPago = parseNumero(cols[baseIdx + 2]);

      let texto: string;
      let tipo: TipoMes;

      if (aporte >= APORTE_MENSUAL) {
        pagados++;
        tipo = 'ok';
        texto = mDebe > 0 ? `${APORTE_MENSUAL} + ${mDebe} multa` : `${APORTE_MENSUAL} Bs`;
      } else if (mDebe > 0) {
        tipo = 'fine';
        texto = 'Pendiente*';
      } else {
        tipo = 'debt';
        texto = 'Pendiente';
      }

      detalleMeses.push({ nombre: NOMBRES_MESES[m], texto, tipo });

      if (mDebe > 0) multaDebe += mDebe;
      if (mPago > 0) multaPagada += mPago;
    }

    integrantes.push({ id: parseInt(idStr, 10), nombre, pagados, multaPagada, multaDebe, detalleMeses });
  }

  return integrantes;
}
