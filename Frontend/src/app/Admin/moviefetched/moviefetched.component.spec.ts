import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviefetchedComponent } from './moviefetched.component';

describe('MoviefetchedComponent', () => {
  let component: MoviefetchedComponent;
  let fixture: ComponentFixture<MoviefetchedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviefetchedComponent]
    });
    fixture = TestBed.createComponent(MoviefetchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
