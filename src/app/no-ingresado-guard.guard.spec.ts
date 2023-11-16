import { TestBed } from '@angular/core/testing';

import { NoIngresadoGuardGuard } from './no-ingresado-guard.guard';

describe('NoIngresadoGuardGuard', () => {
  let guard: NoIngresadoGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoIngresadoGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
