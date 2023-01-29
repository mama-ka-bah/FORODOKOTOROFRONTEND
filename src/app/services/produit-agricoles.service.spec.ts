import { TestBed } from '@angular/core/testing';

import { ProduitAgricolesService } from './produit-agricoles.service';

describe('ProduitAgricolesService', () => {
  let service: ProduitAgricolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitAgricolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
