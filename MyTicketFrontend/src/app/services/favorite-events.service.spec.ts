import { TestBed } from '@angular/core/testing';

import { FavoriteEventsService } from './favorite-events.service';

describe('FavoriteEventsService', () => {
  let service: FavoriteEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
