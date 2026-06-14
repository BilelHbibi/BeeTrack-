import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInspectioneDialogComponent } from './update-inspectione-dialog.component';

describe('UpdateInspectioneDialogComponent', () => {
  let component: UpdateInspectioneDialogComponent;
  let fixture: ComponentFixture<UpdateInspectioneDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateInspectioneDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateInspectioneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
