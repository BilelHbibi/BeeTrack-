import { TestBed } from '@angular/core/testing';

import { RucherService } from './rucher.service';

describe('RucherService', () => {
  let service: RucherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RucherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
