import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordBankComponent } from './word-bank.component';

describe('WordBankComponent', () => {
  let component: WordBankComponent;
  let fixture: ComponentFixture<WordBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
