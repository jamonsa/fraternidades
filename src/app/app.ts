import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IntegranteCard } from './components/integrante-card/integrante-card';
import { ResumenCards } from './components/resumen-cards/resumen-cards';
import { Integrante } from './models/integrante';
import { CobranzasService } from './services/cobranzas.service';
import { calcularResumen } from './utils/calculos';

type EstadoCarga = 'cargando' | 'listo' | 'error';

@Component({
  selector: 'app-root',
  imports: [ResumenCards, IntegranteCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly cobranzas = inject(CobranzasService);

  readonly integrantes = signal<Integrante[]>([]);
  readonly estado = signal<EstadoCarga>('cargando');
  readonly resumen = computed(() => calcularResumen(this.integrantes()));

  constructor() {
    this.cobranzas
      .obtenerIntegrantes()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (datos) => {
          this.integrantes.set(datos);
          this.estado.set('listo');
        },
        error: (err) => {
          console.error(err);
          this.estado.set('error');
        },
      });
  }
}
