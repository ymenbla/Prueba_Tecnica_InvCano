import { AfterViewInit, Component, effect, inject, input, output, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Machine } from '@features/machines';

@Component({
  selector: 'app-card-machines',
  imports: [
    MatTableModule, MatSortModule,MatPaginatorModule,
    MatButtonModule,MatIconModule,MatCardModule,
    MatFormFieldModule, MatInputModule,
  ],
  templateUrl: './card-machines.html',
  styleUrl: './card-machines.scss',
})
export class CardMachines implements AfterViewInit {

  readonly machines = input.required<Machine[]>();
  readonly machineSelected = output<Machine>();
  readonly selectedMachine = signal<Machine | null>(null);

  columnsMachines: string[] = ['code', 'name'];
  dataSourceMachines = new MatTableDataSource<Machine>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      this.dataSourceMachines.data = this.machines();
    });
  }

  ngAfterViewInit() {
    this.dataSourceMachines.paginator = this.paginator;
    this.dataSourceMachines.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMachines.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceMachines.paginator) {
      this.dataSourceMachines.paginator.firstPage();
    }
  }

  selectMachine(machine: Machine): void {
    this.selectedMachine.set(machine);
    this.machineSelected.emit(machine);
  }

}
