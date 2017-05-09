/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustExtBrowserXhrService } from './cust-ext-browser-xhr.service';

describe('CustExtBrowserXhrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustExtBrowserXhrService]
    });
  });

  it('should ...', inject([CustExtBrowserXhrService], (service: CustExtBrowserXhrService) => {
    expect(service).toBeTruthy();
  }));
});
