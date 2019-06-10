import { TestBed } from '@angular/core/testing';

import { StackedChartServiceService } from './stacked-chart-service.service';

describe('StackedChartServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StackedChartServiceService = TestBed.get(StackedChartServiceService);
    expect(service).toBeTruthy();
  });
});
