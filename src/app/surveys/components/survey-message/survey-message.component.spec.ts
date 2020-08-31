import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMessageComponent } from './survey-message.component';

describe('SurveyMessageComponent', () => {
  let component: SurveyMessageComponent;
  let fixture: ComponentFixture<SurveyMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
