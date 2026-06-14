import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRucheDialogComponent } from './update-ruche-dialog.component';

describe('UpdateRucheDialogComponent', () => {
  let component: UpdateRucheDialogComponent;
  let fixture: ComponentFixture<UpdateRucheDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateRucheDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateRucheDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
