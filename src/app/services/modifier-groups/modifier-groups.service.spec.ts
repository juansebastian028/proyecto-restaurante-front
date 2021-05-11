import { TestBed } from '@angular/core/testing';

import { ModifierGroupsService } from './modifier-groups.service';

describe('ModifierGroupsService', () => {
  let service: ModifierGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifierGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
