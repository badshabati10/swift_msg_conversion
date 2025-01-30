import { TestBed } from '@angular/core/testing';

import { MessageIdMaintService } from './message-id-maint.service';

describe('MessageIdMaintService', () => {
  let service: MessageIdMaintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageIdMaintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
