import { TestBed } from '@angular/core/testing';

import { AuthserveService } from './authserve.service';

describe('AuthserveService', () => {
  let service: AuthserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
