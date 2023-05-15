import { TestBed } from '@angular/core/testing';

import { PasswordchangeService } from './passwordchange.service';

describe('PasswordchangeService', () => {
  let service: PasswordchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
