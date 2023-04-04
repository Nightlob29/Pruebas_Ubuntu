import { TestBed } from '@angular/core/testing';

import { DescargarServiceService } from './descargar-service.service';

describe('DescargarServiceService', () => {
  let service: DescargarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescargarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
