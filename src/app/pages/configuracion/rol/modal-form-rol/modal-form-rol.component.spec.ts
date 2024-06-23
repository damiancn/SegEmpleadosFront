import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormRolComponent } from './modal-form-rol.component';

describe('ModalFormRolComponent', () => {
  let component: ModalFormRolComponent;
  let fixture: ComponentFixture<ModalFormRolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFormRolComponent]
    });
    fixture = TestBed.createComponent(ModalFormRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
