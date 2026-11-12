import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Integrante } from '../../models/integrante';
import { BsPipe } from '../../pipes/bs.pipe';
import { aportePagado, deudaTotal, estaAlDia, mesesPendientes } from '../../utils/calculos';

@Component({
  selector: 'app-integrante-card',
  imports: [BsPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './integrante-card.html',
  styleUrl: './integrante-card.css',
})
export class IntegranteCard {
  readonly integrante = input.required<Integrante>();

  readonly alDia = computed(() => estaAlDia(this.integrante()));
  readonly pendientes = computed(() => mesesPendientes(this.integrante()));
  readonly aportePagado = computed(() => aportePagado(this.integrante()));
  readonly deudaTotal = computed(() => deudaTotal(this.integrante()));
}
