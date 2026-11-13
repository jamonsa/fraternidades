import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { QR_PAGO_DESCARGA_URL, QR_PAGO_DRIVE_URL, QR_PAGO_IMAGEN_URL } from '../../config';

/** Botón flotante "Pagar con QR" que abre una hoja con el código QR de pago. */
@Component({
  selector: 'app-pago-qr',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pago-qr.html',
  styleUrl: './pago-qr.css',
})
export class PagoQr {
  readonly imagenUrl = QR_PAGO_IMAGEN_URL;
  readonly descargaUrl = QR_PAGO_DESCARGA_URL;
  readonly driveUrl = QR_PAGO_DRIVE_URL;

  readonly imagenFallo = signal(false);
  private readonly dialogo = viewChild.required<ElementRef<HTMLDialogElement>>('dialogo');

  abrir(): void {
    this.dialogo().nativeElement.showModal();
  }

  cerrar(): void {
    this.dialogo().nativeElement.close();
  }

  /** Cierra al tocar el fondo oscuro (fuera de la hoja). */
  alClicDialogo(evento: MouseEvent): void {
    if (evento.target === this.dialogo().nativeElement) this.cerrar();
  }
}
