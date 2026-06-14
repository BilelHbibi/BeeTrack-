import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTacheDialogComponent } from './update-tache-dialog.component';

describe('UpdateTacheDialogComponent', () => {
  let component: UpdateTacheDialogComponent;
  let fixture: ComponentFixture<UpdateTacheDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateTacheDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateTacheDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
