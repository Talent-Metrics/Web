import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyOutputComponent } from './survey-output.component';

describe('SurveyOutputComponent', () => {
  let component: SurveyOutputComponent;
  let fixture: ComponentFixture<SurveyOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
