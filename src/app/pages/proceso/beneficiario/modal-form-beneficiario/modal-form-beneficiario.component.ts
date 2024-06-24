import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Subscription } from 'rxjs';
import { Beneficiary } from 'src/app/model/process/beneficiary';
import { BeneficiaryService } from 'src/app/service/beneficiary/beneficiary.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Employee } from '../../../../model/process/employee';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-form-beneficiario',
  templateUrl: './modal-form-beneficiario.component.html',
  styleUrls: ['./modal-form-beneficiario.component.scss'],
  standalone: true,
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatInputModule,
  ],
})
export class ModalFormBeneficiarioComponent implements OnInit, OnDestroy {
  form: FormGroup;
  saveForm = false;
  employee: Employee[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Beneficiary | null,
    private formBuilder: FormBuilder,
    private self: MatDialogRef<ModalFormBeneficiarioComponent>,
    private modal: MatDialog,
    private beneficiaryService: BeneficiaryService,
    private employeeService: EmployeeService,
  ) { }
  subscription = new Subscription;

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.createForm();
    this.getEmployee();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm(): void {
    if (this.data != null) {
      this.fillForm(this.data);
    } else {
      this.loadForm();
    }
  }
  getEmployee(): void {
    this.subscription.add(
      this.employeeService.get().subscribe({
        next: (e) => {
          if (e.ok) {
            this.employee = e.dto;
          }
        },
        error: (e) => {
        }
      })
    );
  }

  loadForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      seconLastName: ['', Validators.required],
      relationship: ['', Validators.required],
      fk_Employee: ['', Validators.required],
      employeeName: ['', Validators.required],
    });
  }
  fillForm(data: Beneficiary): void {
    this.form = this.formBuilder.group({
      id: [data.id, Validators.required],
      name: [data.name, Validators.required],
      firstName: [data.firstName, Validators.required],
      seconLastName: [data.seconLastName, Validators.required],
      relationship: [data.relationship, Validators.required],
      fk_Employee: [data.fk_Employee, Validators.required],
      employeeName: [data.employeeName, Validators.required],
    });
  }

  concatenateName(elm: Employee): string {
    return `${elm.name} ${elm.firstName} ${elm.seconLastName}`;
  }

  employeeSelected(nameEmployee: string) {
    const employeeSelected = this.employee.find((e) => e.fullName == nameEmployee);
    this.f['fk_Employee'].setValue(employeeSelected?.id);
  }
  save() {
    this.saveForm = true;
    if (this.form.valid) {
      const data = this.form.value as Beneficiary;
      if (this.data == null) {
        this.modelPost(data);
      } else {
        this.modelUpdate(data);
      }
    } else {
      
    }
  }

  modelPost(model: Beneficiary): void {
    this.subscription.add(
      this.beneficiaryService.save(model).subscribe({
        next: (e) => {
          if (e.ok) {
            this.self.close(true);
          }
        },
        error: (e) => {
        }
      })
    );
  }
  modelUpdate(model: Beneficiary): void {
    this.subscription.add(
      this.beneficiaryService.update(model.id, model).subscribe({
        next: (e) => {
          if (e.ok) {
            this.self.close(true);
          }
        },
        error: (e) => {
        }
      })
    );
  }
  validateForm(inputName: string): boolean {
    return (
      this.form.get(`${inputName}`)?.invalid &&
      this.form.get(`${inputName}`)?.errors &&
      (this.form.get(`${inputName}`)?.dirty ||
        this.form.get(`${inputName}`)?.touched ||
        this.saveForm)
    );
  }
}
