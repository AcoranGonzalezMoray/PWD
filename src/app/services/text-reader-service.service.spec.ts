import { TestBed } from '@angular/core/testing';

import { TextReaderServiceService } from './text-reader-service.service';

describe('TextReaderServiceService', () => {
  let service: TextReaderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextReaderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
