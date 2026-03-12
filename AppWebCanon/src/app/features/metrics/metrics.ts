import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';

import {provideNativeDateAdapter} from '@angular/material/core';
import { MetricsService } from './services/metrics-service';
import { MachineMetrics, MachineWithProduction } from '@features/metrics';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-metrics',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIcon,
    ReactiveFormsModule,
    DecimalPipe
  ],
  templateUrl: './metrics.html',
  styleUrl: './metrics.scss',
  providers: [provideNativeDateAdapter()]
})
export class Metrics {
  private readonly metricsService = inject(MetricsService);

  metrics = signal<MachineMetrics | null>(null);
  machines = signal<MachineWithProduction[] | null>(null);

  readonly range = new FormGroup({
    from: new FormControl<Date | null >(null, Validators.required),
    to: new FormControl<Date | null>(null, Validators.required),
  });

  readonly selectMachines = new FormControl({value: '', disabled: true}, Validators.required);


  onChangeRangeDate(event: MatDatepickerInputEvent<Date>){
    this.loadMachinesWithProduction();
  }

  loadMachinesWithProduction() {
    if (!this.range.valid) return;

    this.metricsService.getMachines(
      this.range.value.from as Date,
      this.range.value.to as Date
    ).subscribe({
      next: machines => {
        this.machines.set(machines);

        this.disableSelectMachine();
      },
      error: err => {
        console.error(err);
        //mensaje de error al usuario
      },
      complete: () => '',
    })
  }

  loadMetrics() {
    if (!this.range.valid || !this.selectMachines.valid) return;

    const from = this.range.value.from as Date;
    const to = this.range.value.to as Date;
    const machineId = Number(this.selectMachines.value);

    console.log(this.selectMachines.value)

    this.metricsService.getDailyMetrics(machineId, from, to)
      .subscribe({
        next: metrics => {
          this.metrics.set(metrics);
        },
        error: err => {
          console.error(err);
          //mensaje de error al usuario
        },
        complete: () => '',
      })
  }

  disableSelectMachine() {
    const select = this.selectMachines;
    this.machines()?.length ? select.enable() :select.disable();
  }

}

