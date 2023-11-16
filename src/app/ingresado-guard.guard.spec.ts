import { TestBed } from '@angular/core/testing';

import { IngresadoGuardGuard } from './ingresado-guard.guard';

describe('IngresadoGuardGuard', () => {
  let guard: IngresadoGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IngresadoGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
