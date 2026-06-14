import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecolteComponent } from './list-recolte.component';

describe('ListRecolteComponent', () => {
  let component: ListRecolteComponent;
  let fixture: ComponentFixture<ListRecolteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListRecolteComponent]
    });
    fixture = TestBed.createComponent(ListRecolteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
