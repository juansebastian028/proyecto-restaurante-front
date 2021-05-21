import { TestBed } from '@angular/core/testing';

import { ModifierGroupService } from './modifier-group.service';

describe('ModifierGroupService', () => {
  let service: ModifierGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifierGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
