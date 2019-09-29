import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'survey-subject-info',
  templateUrl: './survey-subject-info.component.html',
  styleUrls: ['./survey-subject-info.component.scss']
})
export class SurveySubjectInfoComponent implements OnInit {
  surveySubjectForm: FormGroup;
  type: string;
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
    console.log(this.data.form);
  }

}
