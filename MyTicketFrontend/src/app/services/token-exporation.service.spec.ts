import { TestBed } from '@angular/core/testing';

import { TokenExporationService } from './token-expiration.service';

describe('TokenExporationService', () => {
  let service: TokenExporationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenExporationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
