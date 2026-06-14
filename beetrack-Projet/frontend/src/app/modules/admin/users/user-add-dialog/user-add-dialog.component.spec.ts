import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddDialogComponent } from './user-add-dialog.component';

describe('UserAddDialogComponent', () => {
  let component: UserAddDialogComponent;
  let fixture: ComponentFixture<UserAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserAddDialogComponent]
    });
    fixture = TestBed.createComponent(UserAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
