import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-survey-subject-info',
  templateUrl: './survey-subject-info.component.html',
  styleUrls: ['./survey-subject-info.component.scss']
})
export class SurveySubjectInfoComponent implements OnInit {
  surveySubjectForm: FormGroup;
  type: string;
  viewUpdate: boolean;

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
    { key: 6, value: 'Graduate or Professional Degree' },
    { key: 7, value: 'Trade School' }
  ];

  updateSurveySubject() {
    this.dialogRef.close(this.surveySubjectForm);
  }
  addSurveySubject() {
    this.dialogRef.close(this.surveySubjectForm);
  }
  constructor(
    public dialogRef: MatDialogRef<SurveySubjectInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.surveySubjectForm = this.data.form;
    this.type = this.data.type;
    this.viewUpdate = (this.type !== 'add' ? true : false);
    console.log(this.data.form);
    console.log('Type = ' + this.data.type);
  }



}
