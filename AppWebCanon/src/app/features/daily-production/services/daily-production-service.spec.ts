import { TestBed } from '@angular/core/testing';

import { DailyProductionService } from './daily-production-service';

describe('DailyProductionService', () => {
  let service: DailyProductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyProductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
