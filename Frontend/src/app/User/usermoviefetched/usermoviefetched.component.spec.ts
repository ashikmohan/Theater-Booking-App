import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermoviefetchedComponent } from './usermoviefetched.component';

describe('UsermoviefetchedComponent', () => {
  let component: UsermoviefetchedComponent;
  let fixture: ComponentFixture<UsermoviefetchedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsermoviefetchedComponent]
    });
    fixture = TestBed.createComponent(UsermoviefetchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
