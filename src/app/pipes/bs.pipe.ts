import { Pipe, PipeTransform } from '@angular/core';

/** Formatea un monto en bolivianos: 1500 -> "1,500 Bs" (según el locale del navegador). */
@Pipe({ name: 'bs' })
export class BsPipe implements PipeTransform {
  transform(valor: number): string {
    return `${valor.toLocaleString()} Bs`;
  }
}
