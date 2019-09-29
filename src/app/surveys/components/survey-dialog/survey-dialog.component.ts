import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormGroup} from '@angular/forms';
import {WordBank} from '../../../word-bank/models/word-bank';

@Component({
  selector: 'survey-dialog',
  templateUrl: './survey-dialog.component.html',
  styleUrls: ['./survey-dialog.component.scss']
})
export class SurveyDialogComponent implements OnInit {
  parent: FormGroup;
  wordBanks: WordBank[];
  initSurvey(a) {
    this.wordBanks = a.wordBanks;
    this.parent = a.form;
  }
  createSurvey() {
    this.dialogRef.close(this.parent.value);
  }
  constructor(
    public dialogRef: MatDialogRef<SurveyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.initSurvey(this.data);
  }

}
