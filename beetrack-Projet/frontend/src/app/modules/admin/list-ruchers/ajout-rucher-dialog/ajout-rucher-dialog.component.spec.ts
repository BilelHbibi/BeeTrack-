import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRucherDialogComponent } from './ajout-rucher-dialog.component';

describe('AjoutRucherDialogComponent', () => {
  let component: AjoutRucherDialogComponent;
  let fixture: ComponentFixture<AjoutRucherDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AjoutRucherDialogComponent]
    });
    fixture = TestBed.createComponent(AjoutRucherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
