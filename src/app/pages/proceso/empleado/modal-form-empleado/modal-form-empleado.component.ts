import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/model/process/employee';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { format, parseISO } from 'date-fns';
import { DocumentosUploadComponent } from 'src/app/components/documentos-updload/documentos-upload.component';
import { AlertService } from '../../../../components/alert';
@Component({
  selector: 'app-modal-form-empleado',
  templateUrl: './modal-form-empleado.component.html',
  styleUrls: ['./modal-form-empleado.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    DocumentosUploadComponent,
  ],
  providers: [
    AlertService
  ],
})
export class ModalFormEmpleadoComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DocumentosUploadComponent) documentosUploadFile: DocumentosUploadComponent;

  form: FormGroup;
  saveForm = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Employee | null,
    private formBuilder: FormBuilder,
    private self: MatDialogRef<ModalFormEmpleadoComponent>,
    private modal: MatDialog,
    private employeeService: EmployeeService,
    private alerService: AlertService
  ) {
    this.createForm();

  }
  get f() { return this.form.controls; }
  subscription = new Subscription;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.documentosUploadFile.cargarArchivo(this.data?.fotography);
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

  loadForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      seconLastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      fotography: ['', Validators.required],
      dateAcces: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }
  fillForm(data: Employee): void {
    this.form = this.formBuilder.group({
      id: [data.id],
      name: [data.name, Validators.required],
      firstName: [data.firstName, Validators.required],
      seconLastName: [data.seconLastName, Validators.required],
      birthDate: [data.birthDate, Validators.required],
      fotography: [data.fotography, Validators.required],
      dateAcces: [data.dateAcces, Validators.required],
      position: [data.position, Validators.required],
      salary: [data.salary, Validators.required],
    });

  }
  recibirBase(data: any) {
    console.log("🚀 ~ ModalFormEmpleadoComponent ~ recibirBase ~ data:", data)
    this.form.get('fotography').setValue(data);
  }
  validate(inputName: string): boolean {
    return (
      this.form.get(`${inputName}`)?.invalid &&
      this.form.get(`${inputName}`)?.errors &&
      (this.form.get(`${inputName}`)?.dirty ||
        this.form.get(`${inputName}`)?.touched ||
        this.saveForm)
    );
  }
  save() {
    const data = this.form.value as Employee;
    const photo = this.documentosUploadFile.fileUploaded;
    if (photo.length == null) {
      this.alerService.showError('Se requiere una fotografía');
    }
    if (this.form.valid) {
      let birthDate = new Date(data.birthDate);
      let dataAcces = new Date(data.dateAcces);
      data.birthDate = this.convertirDatoToString(birthDate);
      data.dateAcces = this.convertirDatoToString(dataAcces);
      if (this.data == null) {
        this.modelPost(data);
      } else {
        this.modelUpdate(data);
      }
    } else {

    }
  }
  convertirDatoToString(date: Date): string {
    return format(new Date(), "yyyy-MM-dd'T'HH:mm");
  }
  modelPost(model: Employee): void {
    this.subscription.add(
      this.employeeService.save(model).subscribe({
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
  modelUpdate(model: Employee): void {
    this.subscription.add(
      this.employeeService.update(model.id, model).subscribe({
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
}
