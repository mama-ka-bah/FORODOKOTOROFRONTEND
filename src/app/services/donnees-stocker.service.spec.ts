import { TestBed } from '@angular/core/testing';

import { DonneesStockerService } from './donnees-stocker.service';

describe('DonneesStockerService', () => {
  let service: DonneesStockerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonneesStockerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
