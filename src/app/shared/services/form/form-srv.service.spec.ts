import { TestBed } from '@angular/core/testing';

import { FormSrvService } from './form-srv.service';

describe('FormSrvService', () => {
  let service: FormSrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
