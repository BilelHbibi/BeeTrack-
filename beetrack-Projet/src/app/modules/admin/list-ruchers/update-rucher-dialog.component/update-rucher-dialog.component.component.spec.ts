import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRucherDialogComponent } from './update-rucher-dialog.component.component';

describe('UpdateRucherDialogComponentComponent', () => {
  let component: UpdateRucherDialogComponent;
  let fixture: ComponentFixture<UpdateRucherDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateRucherDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateRucherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
