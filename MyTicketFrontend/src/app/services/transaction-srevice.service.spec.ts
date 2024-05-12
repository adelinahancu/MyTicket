import { TestBed } from '@angular/core/testing';

import { TransactionSreviceService } from './transaction-srevice.service';

describe('TransactionSreviceService', () => {
  let service: TransactionSreviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionSreviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
