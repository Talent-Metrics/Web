import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCategoriesComponent } from './survey-categories.component';

describe('SurveyCategoriesComponent', () => {
  let component: SurveyCategoriesComponent;
  let fixture: ComponentFixture<SurveyCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
