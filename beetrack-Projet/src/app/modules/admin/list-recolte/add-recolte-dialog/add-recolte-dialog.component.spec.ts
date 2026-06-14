import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecolteDialogComponent } from './add-recolte-dialog.component';

describe('AddRecolteDialogComponent', () => {
  let component: AddRecolteDialogComponent;
  let fixture: ComponentFixture<AddRecolteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddRecolteDialogComponent]
    });
    fixture = TestBed.createComponent(AddRecolteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
