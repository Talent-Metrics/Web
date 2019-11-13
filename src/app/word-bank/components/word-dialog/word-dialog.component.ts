import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-word-dialog',
  templateUrl: './word-dialog.component.html',
  styleUrls: ['./word-dialog.component.scss']
})
export class WordDialogComponent implements OnInit {
  parent: FormGroup;
  createWord() {
    this.dialogRef.close(this.parent);
  }

  updateWord() {
    this.dialogRef.close(this.parent);
  }
  constructor(
    public dialogRef: MatDialogRef<WordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.parent = this.data.wordForm;
  }

}
