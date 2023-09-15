import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavdComponent } from './navd.component';

describe('NavdComponent', () => {
  let component: NavdComponent;
  let fixture: ComponentFixture<NavdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavdComponent]
    });
    fixture = TestBed.createComponent(NavdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
