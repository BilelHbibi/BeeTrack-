import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRuchComponent } from './list-ruch.component';

describe('ListRuchComponent', () => {
  let component: ListRuchComponent;
  let fixture: ComponentFixture<ListRuchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListRuchComponent]
    });
    fixture = TestBed.createComponent(ListRuchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
