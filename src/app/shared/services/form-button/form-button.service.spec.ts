import { TestBed } from '@angular/core/testing';

import { FormButtonService } from './form-button.service';

describe('FormButtonServiceService', () => {
  let service: FormButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
