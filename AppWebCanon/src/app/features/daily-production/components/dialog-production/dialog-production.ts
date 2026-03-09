import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from "@angular/material/icon";
import { DatePipe, formatDate } from '@angular/common';
import {
  DailyProductionService,
  DailyProduction as Production,
  DailyProductionCreate
} from '@features/daily-production';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
import { fieldsValuesValidator } from '@features/daily-production/validators/fieldsValuesValidator';

@Component({
  selector: 'app-dialog-production',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIcon,
    DatePipe,
    MatProgressSpinnerModule
],
  templateUrl: './dialog-production.html',
  styleUrl: './dialog-production.scss',
})
export class DialogProduction {

  private fb = inject(FormBuilder);

  private dialogRef = inject(
    MatDialogRef<DialogProduction>
  );
  private snackbar = inject(MatSnackBar);

  private productionService = inject(DailyProductionService);

  data = inject(MAT_DIALOG_DATA);


  form = this.fb.nonNullable.group({
    machineId: [0],
    date: ['', Validators.required],
    targetUnits: [0, [Validators.required, Validators.min(0)]],
    okUnits: [0, [Validators.required, Validators.min(0)]],
    defectUnits: [0, [Validators.required, Validators.min(0)]]

  }, { validators: fieldsValuesValidator });

  readonly saving = signal(false);

  constructor() {

    this.form.patchValue({
      machineId: this.data.machine.machineId,
      date: formatDate(
        this.data.date,
        'yyyy-MM-dd',
        'en',
        'America/Bogota'
      )
    });

  }

  get f() {
    return this.form.controls;
  }
  save() {

    if (this.form.invalid) return;

    const value = this.form.value as DailyProductionCreate;

    this.saving.set(true);
    this.productionService.createDailyProduction(value)
      .subscribe({
        next: (response) => {
          this.dialogRef.close({response, saved: true});
          this.snackbar.open('Producción guardada', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error creating daily production:', err);
          this.snackbar.open('Error al guardar la producción', 'Cerrar', { duration: 3000 });
          this.saving.set(false);
        },
        complete: () => {
          console.log('Create daily production request completed');
          this.saving.set(false);
        }
      });
  }

  close() {
    this.dialogRef.close();
  }

  onChangeform() {
    const fm = this.form;
    const val = fm.value;
    const targetUnits = val.targetUnits || 0;
    const okUnits = val.okUnits || 0;
    const defectUnits = val.defectUnits || 0;

    if (targetUnits && okUnits && !defectUnits) {
      fm.patchValue({ defectUnits: targetUnits - okUnits }, { emitEvent: false });
    }
    if (targetUnits && defectUnits && !okUnits) {
      fm.patchValue({ okUnits: targetUnits - defectUnits }, { emitEvent: false });
    }
    if (okUnits && defectUnits && !targetUnits) {
      fm.patchValue({ targetUnits: okUnits + defectUnits }, { emitEvent: false });
    }

  }
}
