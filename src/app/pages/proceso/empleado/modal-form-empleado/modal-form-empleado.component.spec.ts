import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormEmpleadoComponent } from './modal-form-empleado.component';

describe('ModalFormEmpleadoComponent', () => {
  let component: ModalFormEmpleadoComponent;
  let fixture: ComponentFixture<ModalFormEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFormEmpleadoComponent]
    });
    fixture = TestBed.createComponent(ModalFormEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
