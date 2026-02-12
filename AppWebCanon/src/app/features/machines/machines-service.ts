import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateMachineRequest, Machine } from './types/machine.interface';
import { Observable } from 'rxjs';
import { environment as env } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MachinesService {
  private readonly baseUrl = `${env.API_URL}/machines`;
  private http = inject(HttpClient);

  // GET /api/machines
  getMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.baseUrl);
  }

  // POST /api/machines
  createMachine(data: CreateMachineRequest): Observable<Machine> {
    return this.http.post<Machine>(this.baseUrl, data);
  }

  // PUT /api/machines/{machineId}/disable
  disableMachine(machineId: number): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/${machineId}/disable`,
      {}
    );
  }
}
