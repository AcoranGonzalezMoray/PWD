import { TestBed } from '@angular/core/testing';

import { CategoryShopService } from './category-shop.service';

describe('CategoryShopService', () => {
  let service: CategoryShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
