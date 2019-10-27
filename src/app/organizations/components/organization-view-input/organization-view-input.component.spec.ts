import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationViewInputComponent } from './organization-view-input.component';

describe('OrganizationViewInputComponent', () => {
  let component: OrganizationViewInputComponent;
  let fixture: ComponentFixture<OrganizationViewInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationViewInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationViewInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
