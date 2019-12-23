import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyThankyouComponent } from './survey-thankyou.component';

describe('SurveyThankyouComponent', () => {
  let component: SurveyThankyouComponent;
  let fixture: ComponentFixture<SurveyThankyouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyThankyouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
