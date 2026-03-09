import { Component, effect, inject, input, OnInit, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DailyProduction as Production } from '../../types/dailyProduction.interface';
import { Machine } from '@features/machines';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DialogProduction } from '../dialog-production/dialog-production';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from '@shared/components/confirm-dialog/services/confirm-dialog-service';


@Component({
  selector: 'app-card-production',
  imports: [
    MatCardModule, MatIconModule, MatButtonModule,
    MatTableModule, MatFormFieldModule, MatDatepickerModule,
    MatInputModule, ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './card-production.html',
  styleUrl: './card-production.scss',
})
export class CardProduction implements OnInit {

  private readonly confirmDialogService = inject(ConfirmDialogService);

  machine = input<Machine | null>(null);
  production = input<Production[] | null>(null);
  productionDate = output<Date>();
  disabledProduction = output<Production>();

  readonly date = new FormControl(new Date());

  columnsDProduction: string[] = ['index', 'date', 'targetUnits', 'okUnits', 'defectUnits', 'actions'];
  dataSourceDP = new MatTableDataSource<Production>([]);

  private dialog = inject(MatDialog);

  constructor() {
    // Reactividad entre signal y datasource
    effect(() => {
      this.dataSourceDP.data = this.production() || [];
      // console.log('Producción actualizada:', this.dataSourceDP.data);
    });
  }

  ngOnInit(): void {
    if (this.date.value) this.productionDate.emit(this.date.value);
  }

  changeDate(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = this.date.value;
    if (selectedDate) {
      this.productionDate.emit(selectedDate);
    }
  }

  openModal() {
    const machine = this.machine();

    if (!machine) return;

    this.dialog.open(DialogProduction, {
      data: {
        machine: {...machine},
        date: this.date.value
      }

    }).afterClosed().subscribe(
      (result: {response: Production, saved: boolean} | undefined) => {
        if (result && result.saved) {
          console.log('Producción guardada:', result.response);
          this.dataSourceDP.data = [...this.dataSourceDP.data, result.response];
        }
    });
  }

  disableProduction(production: Production) {
    const title = 'Vas eliminar esta producción';
    const message = '¿Estás seguro de que deseas eliminar esta producción?\n Esta acción no se puede deshacer.';
    this.confirmDialogService.confirm(title, message)
      .subscribe(confirmed => {
        if (confirmed) {
          this.disabledProduction.emit(production);
        }
      });
  }

  calculateTotals(field: string): number {
    return this.dataSourceDP.data.reduce((sum, prod) => sum + (prod as any)[field], 0);
  }
}
