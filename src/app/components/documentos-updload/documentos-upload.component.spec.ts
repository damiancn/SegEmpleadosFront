import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosUploadComponent } from './documentos-upload.component';

describe('ArchivosUploadComponent', () => {
  let component: DocumentosUploadComponent;
  let fixture: ComponentFixture<DocumentosUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentosUploadComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DocumentosUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
