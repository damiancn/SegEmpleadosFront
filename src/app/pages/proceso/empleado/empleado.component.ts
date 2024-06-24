import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/model/process/employee';
import { EmployeeService } from '../../../service/employee/employee.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { getMatDialogConfig } from 'src/app/helpers/dialogConfig';
import { ModalFormEmpleadoComponent } from './modal-form-empleado/modal-form-empleado.component';
@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
  ],

})
export class EmpleadoComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Employee>([]);
  displayedColumns: string[] =
    ['name', 'dataAcces', 'age', 'position', 'salary', "action"];
  constructor(
    private modal: MatDialog,
    private employeeService: EmployeeService,
  ) { }
  subscription = new Subscription;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.subscription.add(
      this.employeeService.get().subscribe({
        next: (e) => {
          if (e.ok) {
            this.dataSource = new MatTableDataSource<Employee>(e.dto);
            this.dataSource.paginator = this.paginator;
          }
        },
        error: (e) => {
          // console.log(e);
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  open(row: Employee | null) {
    const config = getMatDialogConfig('1400px', '800px');
    config.data = row;
    this.modal.open(ModalFormEmpleadoComponent, config);
  }
}
