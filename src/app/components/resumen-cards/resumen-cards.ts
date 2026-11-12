import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Resumen } from '../../models/integrante';
import { BsPipe } from '../../pipes/bs.pipe';

@Component({
  selector: 'app-resumen-cards',
  imports: [BsPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="summary-box">
      <div class="card card-green">
        <h3>Recaudado</h3>
        <p>{{ cargando() ? 'Cargando...' : (resumen().recaudado | bs) }}</p>
      </div>
      <div class="card card-red">
        <h3>Pendiente</h3>
        <p>{{ cargando() ? 'Cargando...' : (resumen().pendiente | bs) }}</p>
      </div>
      <div class="card card-yellow">
        <h3>Al Día</h3>
        <p>{{ cargando() ? 'Cargando...' : resumen().alDia + ' / ' + resumen().total }}</p>
      </div>
    </div>
  `,
  styles: `
    .summary-box { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 25px; }
    .card { background: var(--card-bg); padding: 16px; border-radius: 16px; box-shadow: var(--card-shadow); border: 1px solid var(--border-color); }
    .card h3 { margin: 0 0 6px 0; font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--text-secondary); letter-spacing: 0.5px; }
    .card p { margin: 0; font-size: 18px; font-weight: 700; color: var(--text-primary); }
    .card-green { border-top: 4px solid var(--accent-green); }
    .card-red { border-top: 4px solid var(--accent-red); }
    .card-yellow { border-top: 4px solid var(--accent-yellow); }

    @media screen and (max-width: 768px) {
      .summary-box { grid-template-columns: 1fr; gap: 8px; }
    }
  `,
})
export class ResumenCards {
  readonly resumen = input.required<Resumen>();
  readonly cargando = input(false);
}
