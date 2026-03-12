import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MachineMetrics, MachineWithProduction } from '@features/metrics'
import { Observable } from 'rxjs';
import { environment as env } from '@environments/environment';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {

  private readonly baseUrl = `${env.API_URL}/metrics`;
  private http = inject(HttpClient);

  getDailyMetrics(
    machineId: number,
    from: Date,
    to: Date
  ): Observable<MachineMetrics> {

    const FROM = this.customFormatDate(from);
    const TO = this.customFormatDate(to);

    const params = new HttpParams()
      .set('machineId', machineId)
      .set('from', FROM)
      .set('to', TO);

    return this.http.get<MachineMetrics>(
      `${this.baseUrl}/daily`,
      { params }
    );
  }

  /**
   * Obtener máquinas disponibles
   */
  getMachines(
    from: Date,
    to: Date
  ): Observable<MachineWithProduction[]> {


    const FROM = this.customFormatDate(from);
    const TO = this.customFormatDate(to);

    const params = new HttpParams()
      .set('from', FROM)
      .set('to', TO);

    return this.http.get<MachineWithProduction[]>(
      `${this.baseUrl}/machines`,
      { params }
    );
  }

  customFormatDate(date: Date) {
    return formatDate(
      date,
      'yyyy-MM-dd',
      'en',
      'America/Bogota'
    );
  }
}
