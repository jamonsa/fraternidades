import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RAW_CSV_URL } from '../config';
import { Integrante } from '../models/integrante';
import { procesarCSV } from '../utils/csv-parser';

@Injectable({ providedIn: 'root' })
export class CobranzasService {
  private readonly http = inject(HttpClient);

  obtenerIntegrantes(): Observable<Integrante[]> {
    return this.http.get(RAW_CSV_URL, { responseType: 'text' }).pipe(map(procesarCSV));
  }
}
