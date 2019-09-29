import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPyramidComponent } from './survey-pyramid.component';

describe('SurveyPyramidComponent', () => {
  let component: SurveyPyramidComponent;
  let fixture: ComponentFixture<SurveyPyramidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPyramidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPyramidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
