/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CosmeticService } from './cosmetic.service';

describe('CosmeticService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CosmeticService]
    });
  });

  it('should ...', inject([CosmeticService], (service: CosmeticService) => {
    expect(service).toBeTruthy();
  }));
});
