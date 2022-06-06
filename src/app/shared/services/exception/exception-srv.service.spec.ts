import { TestBed } from '@angular/core/testing';

import { ExceptionSrvService } from './exception-srv.service';

describe('ExceptionSrvService', () => {
  let service: ExceptionSrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExceptionSrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
