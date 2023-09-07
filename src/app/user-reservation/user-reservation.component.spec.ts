import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReservationComponent } from './user-reservation.component';

describe('UserReservationComponent', () => {
  let component: UserReservationComponent;
  let fixture: ComponentFixture<UserReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserReservationComponent]
    });
    fixture = TestBed.createComponent(UserReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
