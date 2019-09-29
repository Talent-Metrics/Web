import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'survey-personal',
  templateUrl: './survey-personal.component.html',
  styleUrls: ['./survey-personal.component.scss']
})
export class SurveyPersonalComponent implements OnInit {
  @Input()
    parent: FormGroup;
  @Output()
    update: EventEmitter<any> = new EventEmitter<any>();
  emplClasses = [
    'Exempt', 'Non-Exempt', 'Contractor', 'Temporary'
  ];
  genders = [
    'Female', 'Male', 'Trans', 'Neutral', 'Other'
  ];
  ethnicities = [
    'American Indian', 'Alaska Native', 'Asian', 'Black', 'Hispanic', 'Native Hawaiian', 'Pacific Islander', 'White'
  ];
  veteranStatuses = [
    { key: true, value: 'Veteran' },
    { key: false, value: 'Non-Veteran' }
  ];
  disabilityStatuses = [
    { key: true, value: 'Disabled' },
    { key: false, value: 'Non-Disabled' }
  ];
  educationLevels = [
    { key: 1, value: 'No Formal Education' },
    { key: 2, value: 'Less than High School' },
    { key: 3, value: 'High school' },
    { key: 4, value: 'Some College' },
    { key: 5, value: 'Bachelor\'s Degree' },
    { key: 6, value: 'Graduate or Professional Degree' }
  ];
  constructor() { }
  updatePersonal() {
    this.update.emit({
      values: this.parent.value,
      dirty: this.parent.dirty
    });
  }

  ngOnInit() {
  }

}
