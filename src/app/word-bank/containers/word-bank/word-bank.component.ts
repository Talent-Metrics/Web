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
  selector: 'app-word-bank',
  templateUrl: './word-bank.component.html',
  styleUrls: ['./word-bank.component.scss']
})
export class WordBankComponent implements OnInit {
  wordBanks: WordBank[];
  wordBank: WordBank = undefined;
  unsubscribe$ = new Subject<void>();
  wordBankForm = new FormGroup({
    name: new FormControl({ value: ''}, [
      Validators.required
    ]),
    customerId: new FormControl(''),
    description: new FormControl({ value: ''}),
    words: new FormArray([])
  });

  getAllWords() {
    this.wordBankService.getAll()
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

  selectWordBank(evt: WordBank) {
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

  removeWord(pos: number) {
    (this.wordBankForm.get('words') as FormArray).removeAt(pos);
  }

  wordDefinition(word: string) {
    this.wordBankService.getWordDefinition(word)
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(e => console.log(e), err => console.log(err), () => console.log('done'));
  }

  updateWordBank() {
    this.wordBankService.updateOne(this.wordBank._id, this.wordBankForm.value)
      .subscribe(e => {
        this.getAllWords();
        console.log(e);
      }, err => console.log(err), () => console.log('word back save complete'));
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
        if (result && !result.pristine ) {
          this.pushWord(this.wordBankService.getWordForm(result.value));
          this.updateWordBank();
        }
      }, err => console.log(err), () => console.log('done'));
  }

  updateWordInBank(word: Word) {
    const dialogRef = this.dialog.open(WordDialogComponent, {
      width: '700px',
      data: {
        wordForm: this.wordBankService.getWordForm(word)
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result && !result.pristine) {
          const w = this.wordBank.words.findIndex(k => k.name === result.value.name);
          (this.wordBankForm.get('words') as FormArray).at(w).patchValue(result.value);
          this.updateWordBank();
        }
      }, err => console.log(err), () => console.log('done'));
  }

  deleteWordInBank(word: Word) {
    const w = this.wordBank.words.findIndex(k => k.name === word.name);
    this.removeWord(w);
    this.updateWordBank();
    console.log('Deleted Word in bank =' + word.name);
  }

  deleteWordBank() {
    console.log(this.wordBank._id);
    this.wordBankService.deleteOne(this.wordBank._id)
      .subscribe(e => {
        alert('You have deleted a Word Bank');
        console.log(e);
        this.getAllWords();
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
    this.getAllWords();
  }

}
