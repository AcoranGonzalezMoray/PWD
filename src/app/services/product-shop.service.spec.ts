import { TestBed } from '@angular/core/testing';

import { ProductShopService } from './product-shop.service';

describe('ProductShopService', () => {
  let service: ProductShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
