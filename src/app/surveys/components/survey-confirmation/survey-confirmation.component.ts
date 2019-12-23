import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-survey-confirmation',
  templateUrl: './survey-confirmation.component.html',
  styleUrls: ['./survey-confirmation.component.scss']
})
export class SurveyConfirmationComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SurveyConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }


}
