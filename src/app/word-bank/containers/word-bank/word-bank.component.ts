import { Component, OnInit } from '@angular/core';
import {WordBankService} from '../../services/word-bank.service';
import {WordBank} from '../../models/word-bank';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Word} from '../../models/word';
import {MatDialog} from '@angular/material';
import {WordDialogComponent} from '../../components/word-dialog/word-dialog.component';

@Component({
  selector: 'word-bank',
  templateUrl: './word-bank.component.html',
  styleUrls: ['./word-bank.component.scss']
})
export class WordBankComponent implements OnInit {
  testId = '5c453f7ea0294b2bb92641e0';
  wordBanks: WordBank[];
  wordBank: WordBank = undefined;
  unsubscribe$ = new Subject<void>();
  wordBankForm = new FormGroup({
    name: new FormControl({ value: '', disabled: true }, [
      Validators.required
    ]),
    customerId: new FormControl(''),
    description: new FormControl({ value: '', disabled: true }),
    words: new FormArray([])
  });
  getAllByCustomer(customerId: string) {
    this.wordBankService.getAllByCustomerId(customerId)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((e: WordBank[]) => {
        this.wordBanks = e;
      }, err => {
        alert(err);
        console.log(err);
      }, () => { console.log('Get Word Banks complete'); });
  }
  selectWordBank(evt) {
    this.resetForm();
    this.wordBank = evt;
    this.wordBankForm.patchValue(evt);
    evt.words.forEach(e => {
      this.pushWord(this.wordBankService.getWordForm(e));
    });
  }
  get words() {
    return (this.wordBankForm.get('words') as FormArray).controls;
  }
  pushWord(a: FormGroup) {
    (this.wordBankForm.get('words') as FormArray).push(a);
  }
  wordDefinition(word: string) {
    this.wordBankService.getWordDefinition(word)
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(e => console.log(e), err => console.log(err), () => console.log('done'));
  }
  saveWordBank() {
    this.wordBankService.updateOne(this.wordBank._id, this.wordBankForm.value)
      .subscribe(e => {
        console.log(e);
      }, err => console.log(err), () => console.log('save complete'));
  }
  resetForm() {
    this.wordBankForm.setControl('words', new FormArray([]));
    this.wordBankForm.reset();
  }
  addNewWordToBank() {
    const dialogRef = this.dialog.open(WordDialogComponent, {
      width: '700px',
      data: {
        wordForm: this.wordBankService.getWordForm()
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.pushWord(result);
        }
      }, err => console.log(err), () => console.log('done'));
  }
  deleteWordFromWordBank(pos: number) {
    (this.wordBankForm.get('words') as FormArray).removeAt(pos);
  }
  deleteWordBank() {
    console.log(this.wordBank._id);
    this.wordBankService.deleteOne(this.wordBank._id)
      .subscribe(e => {
        alert('You have deleted a Word Bank');
        console.log(e);
        this.getAllByCustomer(this.testId);
      }, err => console.log(err), () => console.log('delete complete'));
  }
  tester(pos: number) {
    console.log(pos);
  }
  wordBankLength() {
    return (this.wordBankForm.get('words') as FormArray).length;
  }
  constructor(
    private wordBankService: WordBankService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllByCustomer(this.testId);
  }

}
