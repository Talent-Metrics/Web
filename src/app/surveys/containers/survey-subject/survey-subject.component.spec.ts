import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySubjectComponent } from './survey-subject.component';

describe('SurveySubjectComponent', () => {
  let component: SurveySubjectComponent;
  let fixture: ComponentFixture<SurveySubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
