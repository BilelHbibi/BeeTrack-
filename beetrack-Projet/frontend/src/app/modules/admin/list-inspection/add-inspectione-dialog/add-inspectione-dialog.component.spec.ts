import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInspectioneDialogComponent } from './add-inspectione-dialog.component';

describe('AddInspectioneDialogComponent', () => {
  let component: AddInspectioneDialogComponent;
  let fixture: ComponentFixture<AddInspectioneDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddInspectioneDialogComponent]
    });
    fixture = TestBed.createComponent(AddInspectioneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
