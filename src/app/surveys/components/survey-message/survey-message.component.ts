import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-survey-message',
  templateUrl: './survey-message.component.html',
  styleUrls: ['./survey-message.component.scss']
})
export class SurveyMessageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SurveyMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
  }

}
