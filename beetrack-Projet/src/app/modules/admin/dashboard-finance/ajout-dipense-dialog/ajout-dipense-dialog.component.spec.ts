import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDipenseDialogComponent } from './ajout-dipense-dialog.component';

describe('AjoutDipenseDialogComponent', () => {
  let component: AjoutDipenseDialogComponent;
  let fixture: ComponentFixture<AjoutDipenseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AjoutDipenseDialogComponent]
    });
    fixture = TestBed.createComponent(AjoutDipenseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
