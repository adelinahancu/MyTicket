import { TestBed } from '@angular/core/testing';

import { SerachService } from './serach.service';

describe('SerachService', () => {
  let service: SerachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
