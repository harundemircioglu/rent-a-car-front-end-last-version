import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBackgroundComponent } from './admin-background.component';

describe('AdminBackgroundComponent', () => {
  let component: AdminBackgroundComponent;
  let fixture: ComponentFixture<AdminBackgroundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBackgroundComponent]
    });
    fixture = TestBed.createComponent(AdminBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
