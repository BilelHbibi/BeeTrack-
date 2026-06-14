import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRuchersComponent } from './list-ruchers.component';

describe('ListRuchersComponent', () => {
  let component: ListRuchersComponent;
  let fixture: ComponentFixture<ListRuchersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListRuchersComponent]
    });
    fixture = TestBed.createComponent(ListRuchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
