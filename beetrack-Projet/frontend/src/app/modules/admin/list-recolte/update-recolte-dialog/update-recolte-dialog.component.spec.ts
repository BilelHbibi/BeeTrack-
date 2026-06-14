import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRecolteDialogComponent } from './update-recolte-dialog.component';

describe('UpdateRecolteDialogComponent', () => {
  let component: UpdateRecolteDialogComponent;
  let fixture: ComponentFixture<UpdateRecolteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateRecolteDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateRecolteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
