import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRuchDialogComponent } from './ajout-ruch-dialog.component';

describe('AjoutRuchDialogComponent', () => {
  let component: AjoutRuchDialogComponent;
  let fixture: ComponentFixture<AjoutRuchDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AjoutRuchDialogComponent]
    });
    fixture = TestBed.createComponent(AjoutRuchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
