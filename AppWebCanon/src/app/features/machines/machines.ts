import { AfterViewInit, Component, effect, inject, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MachineDialog } from './components/machine-dialog/machine-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Machine } from './types/machine.interface';
import { MachinesService } from './machines-service';


@Component({
  selector: 'app-machines',
  imports: [
    MatCardModule, MatIconModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatTableModule,
    MatSortModule, MatPaginatorModule, MatSlideToggleModule,
    MatDividerModule
  ],
  templateUrl: './machines.html',
  styleUrl: './machines.scss',
})
export class Machines implements AfterViewInit {

  private readonly machinesService = inject(MachinesService);
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['machineId', 'code', 'name', 'isActive'];
  dataSource = new MatTableDataSource<Machine>([]);

  readonly machines = signal<Machine[]>([]);
  readonly loading = signal(false);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Reactividad entre signal y datasource
    effect(() => {
      this.dataSource.data = this.machines();
    });

    this.loadMachines();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadMachines(): void {
    this.loading.set(true);

    this.machinesService.getMachines().subscribe({
      next: machines => {
        this.machines.set(machines);
        this.loading.set(false);
      },
      error: err => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(MachineDialog, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadMachines();
      }
    });
  }
}

