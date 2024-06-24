import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { Beneficiary } from 'src/app/model/process/beneficiary';
import { BeneficiaryService } from '../../../service/beneficiary/beneficiary.service';
import { ModalFormBeneficiarioComponent } from './modal-form-beneficiario/modal-form-beneficiario.component';
import { getMatDialogConfig } from 'src/app/helpers/dialogConfig';
import { AlertService } from 'src/app/components/alert';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.scss'],
  standalone: true,
  imports: [
    MatSnackBarModule,
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  providers: [AlertService],

})
export class BeneficiarioComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Beneficiary>([]);
  displayedColumns: string[] = ['name', 'firstName', 'seconLastName', 'relationship',
    'employeeName',
    'action'];
  dataExist = true;

  constructor(
    private beneficiaryService: BeneficiaryService,
    private modal: MatDialog,
  ) { }
  subscription = new Subscription;

  ngOnInit(): void {
    this.getBeneficiaries();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getBeneficiaries(): void {
    this.subscription.add(
      this.beneficiaryService.get().subscribe({
        next: (e) => {
          if (e.ok) {
            this.dataSource = new MatTableDataSource<Beneficiary>(e.dto);
            this.dataSource.paginator = this.paginator;
          } else {
          }
        },
        error: (e) => {
          if (e.status == 500) {
            console.log("🚀 ~ BeneficiarioComponent ~ this.beneficiaryService.get ~ e:", e)
            this.dataExist = false
          }
        }
      })
    )
  }
  open(row: Beneficiary | null) {
    const modalConfig: MatDialogConfig = getMatDialogConfig('900px', '400px');
    console.log("🚀 ~ BeneficiarioComponent ~ open ~ modalConfig:", modalConfig)
    modalConfig.data = row;
    this.modal.open(ModalFormBeneficiarioComponent, modalConfig);
  }
}
