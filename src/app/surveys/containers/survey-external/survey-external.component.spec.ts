import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyExternalComponent } from './survey-external.component';

describe('SurveyExternalComponent', () => {
  let component: SurveyExternalComponent;
  let fixture: ComponentFixture<SurveyExternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyExternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
