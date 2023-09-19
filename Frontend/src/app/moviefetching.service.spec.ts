import { TestBed } from '@angular/core/testing';

import { MoviefetchingService } from './moviefetching.service';

describe('MoviefetchingService', () => {
  let service: MoviefetchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviefetchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
