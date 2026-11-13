/** CSV publicado desde Google Sheets con los aportes y multas. */
export const RAW_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSSTjvJT1OzMsvCgjD8nhA_yTRPGuQx03Hc9FBoIvI-9xSCcuwF1wDVzRo3a6NmZQ/pub?gid=2080222152&single=true&output=csv';

/** Monto del aporte mensual en Bs. */
export const APORTE_MENSUAL = 150;

/**
 * ID del archivo del QR de pago en Google Drive (debe estar compartido como
 * "Cualquier persona con el enlace"). Para cambiar el QR sin tocar código,
 * en Drive usa "Administrar versiones → Subir nueva versión" sobre el mismo
 * archivo; si subes un archivo nuevo, reemplaza aquí su ID.
 */
const QR_DRIVE_ID = '1NZ7WkKYCSGS5oAnEJ9F6gA2bqcjQXRlo';
export const QR_PAGO_IMAGEN_URL = `https://lh3.googleusercontent.com/d/${QR_DRIVE_ID}=w1000`;
export const QR_PAGO_DESCARGA_URL = `https://drive.google.com/uc?export=download&id=${QR_DRIVE_ID}`;
export const QR_PAGO_DRIVE_URL = `https://drive.google.com/file/d/${QR_DRIVE_ID}/view`;

export const NOMBRES_MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
] as const;
