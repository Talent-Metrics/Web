import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySubjectInfoComponent } from './survey-subject-info.component';

describe('SurveySubjectInfoComponent', () => {
  let component: SurveySubjectInfoComponent;
  let fixture: ComponentFixture<SurveySubjectInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySubjectInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySubjectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
