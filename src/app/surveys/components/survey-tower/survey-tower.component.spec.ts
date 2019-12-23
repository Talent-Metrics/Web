import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTowerComponent } from './survey-tower.component';

describe('SurveyTowerComponent', () => {
  let component: SurveyTowerComponent;
  let fixture: ComponentFixture<SurveyTowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyTowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyTowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
