import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-word-bank-dialog',
  templateUrl: './word-bank-dialog.component.html',
  styleUrls: ['./word-bank-dialog.component.scss']
})
export class WordBankDialogComponent implements OnInit {
  parent: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<WordBankDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  createWordBank() {
    this.dialogRef.close(this.parent);
  }

  ngOnInit() {
    this.parent = this.data.wordBankForm;
  }

}
