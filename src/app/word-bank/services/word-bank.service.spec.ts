import { TestBed } from '@angular/core/testing';

import { WordBankService } from './word-bank.service';

describe('WordBankService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WordBankService = TestBed.get(WordBankService);
    expect(service).toBeTruthy();
  });
});
