import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRevenuDialogComponent } from './ajout-revenu-dialog.component';

describe('AjoutRevenuDialogComponent', () => {
  let component: AjoutRevenuDialogComponent;
  let fixture: ComponentFixture<AjoutRevenuDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AjoutRevenuDialogComponent]
    });
    fixture = TestBed.createComponent(AjoutRevenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
