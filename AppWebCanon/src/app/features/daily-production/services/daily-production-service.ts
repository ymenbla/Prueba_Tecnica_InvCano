import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DailyProduction, DailyProductionCreate } from '../types/dailyProduction.interface';
import { environment as env } from '@environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DailyProductionService {
  private readonly baseUrl = `${env.API_URL}/daily-production`;
  private http = inject(HttpClient);

  // GET
  getDailyProduction(
    machineId: number,
    from: string,
    to: string
  ): Observable<DailyProduction[]> {

    let params = new HttpParams()
      .set('machineId', machineId)
      .set('from', from)
      .set('to', to);

    return this.http.get<DailyProduction[]>(this.baseUrl, { params });
  }


  // POST
  createDailyProduction(
    data: DailyProductionCreate
  ): Observable<DailyProduction> {

    return this.http.post<DailyProduction>(
      this.baseUrl,
      data
    );
  }


  // PUT
  disableDailyProduction(dailyProductionId: number): Observable<void> {

    return this.http.put<void>(
      `${this.baseUrl}/${dailyProductionId}/disable`,
      {}
    );
  }
}
