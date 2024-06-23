import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormBeneficiarioComponent } from './modal-form-beneficiario.component';

describe('ModalFormBeneficiarioComponent', () => {
  let component: ModalFormBeneficiarioComponent;
  let fixture: ComponentFixture<ModalFormBeneficiarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFormBeneficiarioComponent]
    });
    fixture = TestBed.createComponent(ModalFormBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
