import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Word} from '../../../word-bank/models/word';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'survey-output',
  templateUrl: './survey-output.component.html',
  styleUrls: ['./survey-output.component.scss']
})
export class SurveyOutputComponent implements OnInit {
  @Input()
    surveySubjectCategories;
  @Input()
    personalInfo;
  @Input()
    completed;
  @Output()
    update: EventEmitter<any> = new EventEmitter<any>();
  verified: boolean;
  get category1() {
    return this.surveySubjectCategories.get('category1').value as Word[];
  }
  get category2() {
    return this.surveySubjectCategories.get('category2').value as Word[];
  }
  get category3() {
    return this.surveySubjectCategories.get('category3').value as Word[];
  }
  get category4() {
    return this.surveySubjectCategories.get('category4').value as Word[];
  }
  get category5() {
    return this.surveySubjectCategories.get('category5').value as Word[];
  }
  closeDialog(status: boolean) {
    this.verified = status;
    // this.dialogRef.close(this.verified);
  }
  constructor(
    // public dialogRef: MatDialogRef<SurveyOutputComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.personalInfo);
  }

}
