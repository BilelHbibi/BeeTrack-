import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRuchDialogComponentComponent } from './update-ruch-dialog.component.component';

describe('UpdateRuchDialogComponentComponent', () => {
  let component: UpdateRuchDialogComponentComponent;
  let fixture: ComponentFixture<UpdateRuchDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateRuchDialogComponentComponent]
    });
    fixture = TestBed.createComponent(UpdateRuchDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
