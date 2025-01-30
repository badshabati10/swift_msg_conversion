import { TestBed } from '@angular/core/testing';

import { SwiftConversionService } from './swift-conversion.service';

describe('SwiftConversionService', () => {
  let service: SwiftConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwiftConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
