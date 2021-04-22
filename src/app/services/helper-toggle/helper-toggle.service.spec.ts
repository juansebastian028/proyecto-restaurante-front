import { TestBed } from '@angular/core/testing';

import { HelperToggleService } from './helper-toggle.service';

describe('HelperToggleService', () => {
  let service: HelperToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
