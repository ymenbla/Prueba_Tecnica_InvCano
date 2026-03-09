import { Component, computed, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { formatDate } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';

import { MachinesService, Machine } from '@features/machines';
import {
  DailyProductionService,
  CardMachines,
  CardProduction,
  DailyProduction as Production
} from '@features/daily-production';



@Component({
  selector: 'app-daily-production',
  imports: [
    MatTableModule, MatButtonModule, MatIconModule, MatCardModule,
    MatFormFieldModule, MatDatepickerModule, MatInputModule,
    FormsModule, ReactiveFormsModule,
    CardMachines, CardProduction
],
  providers: [provideNativeDateAdapter()],
  templateUrl: './daily-production.html',
  styleUrl: './daily-production.scss',
})
export class DailyProduction {
  private productionService = inject(DailyProductionService);
  private machinesService = inject(MachinesService);


  //material components
  private readonly snackbar = inject(MatSnackBar);


  columnsDProduction: string[] = ['date', 'targetUnits', 'okUnits', 'defectUnits', 'actions'];
  dataSourceDP = new MatTableDataSource<Production>([]);

  //signals
  readonly loading = signal(false);
  readonly reloadTrigger = signal(0);
  readonly machines = signal<Machine[]>([]);
  readonly machineSelected = signal<Machine | null>(null);
  readonly productionDate = signal<Date | null>(null);
  readonly dailyProduction = toSignal(
    toObservable(
      computed(() => ({
        machine: this.machineSelected(),
        date: this.productionDate(),
        reload: this.reloadTrigger()
      }))
    ).pipe(

      switchMap(({ machine, date }) => {

        if (!machine || !date) {
          return of([]);
        }

        const formattedDate = formatDate(
          date,
          'yyyy-MM-dd',
          'en',
          'America/Bogota'
        );

        return this.productionService.getDailyProduction(
          machine.machineId,
          formattedDate,
          formattedDate
        );

      })

    ),

    { initialValue: [] }
  );


  constructor() {
    this.loadMachines();
  }


  loadMachines(): void {
    this.loading.set(true);

    this.machinesService.getMachines().subscribe({
      next: machines => {
        this.machines.set(machines);
      },
      error: err => {
        console.error(err);
        //mensaje de error al usuario
      },
      complete: () => this.loading.set(false)
    });
  }


  onMachineSelected(machine: Machine): void {
    this.machineSelected.set(machine);
    // this.loadProduction();
  }
  onProductionDateSelected(date: Date): void {
    this.productionDate.set(date);
  }
  onProductionDisabled(production: Production): void {
    this.productionService.disableDailyProduction(production.dailyProductionId).subscribe({
      next: () => {
        this.snackbar.open('Producción eliminada', 'Cerrar', { duration: 3000 });
        this.reloadTrigger.update(v => v + 1);
      },
      error: err => {
        console.error(err);
        this.snackbar.open('Error al eliminar la producción', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
