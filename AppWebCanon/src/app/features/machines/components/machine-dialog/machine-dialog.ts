import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MachinesService } from '../../machines-service';
import { CreateMachineRequest } from '../../types/machine.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-machine-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './machine-dialog.html',
  styleUrl: './machine-dialog.scss',
})
export class MachineDialog {
  private readonly machinesService = inject(MachinesService);
  private readonly fb = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<MachineDialog>);
  // readonly data = inject<MachineDialogData>(MAT_DIALOG_DATA);

  saving = signal(false);

  machineForm = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9-]+$/)]],
    name: ['', Validators.required],
  });

  get f() { return this.machineForm.controls; }

  save() {
    if (this.machineForm.invalid) {
      this.machineForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);

    this.machinesService.createMachine(this.machineForm.value as CreateMachineRequest).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: err => {
        console.error(err);
        this.saving.set(false);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
