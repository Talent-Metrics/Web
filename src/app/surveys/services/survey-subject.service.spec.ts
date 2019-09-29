import { TestBed } from '@angular/core/testing';

import { SurveySubjectService } from './survey-subject.service';

describe('SurveySubjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurveySubjectService = TestBed.get(SurveySubjectService);
    expect(service).toBeTruthy();
  });
});
