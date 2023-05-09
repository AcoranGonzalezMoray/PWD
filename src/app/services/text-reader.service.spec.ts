import { TestBed } from '@angular/core/testing';

import { TextReaderService } from './text-reader.service';

describe('TextReaderService', () => {
  let service: TextReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
