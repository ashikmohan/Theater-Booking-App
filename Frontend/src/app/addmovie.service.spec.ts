import { TestBed } from '@angular/core/testing';

import { AddmovieService } from './addmovie.service';

describe('AddmovieService', () => {
  let service: AddmovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddmovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
