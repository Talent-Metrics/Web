import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {WordBank} from '../../../word-bank/models/word-bank';

@Component({
  selector: 'survey-categories',
  templateUrl: './survey-categories.component.html',
  styleUrls: ['./survey-categories.component.scss']
})
export class SurveyCategoriesComponent implements OnInit {
  @Input()
    parent: FormGroup;
  @Input()
    wordBank: WordBank;
  @Output()
    update: EventEmitter<any> = new EventEmitter<any>();
  wordBankBackup: WordBank;
  highly = [];
  somewhat = [];
  slightly = [];
  notVery = [];
  notAtAll = [];
  constructor() { }
  wordBankToCategory(evt) {
    if (this.highly.length < 3) {
      this.highly.push(this.wordBankBackup.words.splice(evt, 1)[0]);
    } else if (this.somewhat.length < 6) {
      this.somewhat.push(this.wordBankBackup.words.splice(evt, 1)[0]);
    } else if (this.slightly.length < 8) {
      this.slightly.push(this.wordBankBackup.words.splice(evt, 1)[0]);
    } else if (this.notVery.length < 6) {
      this.notVery.push(this.wordBankBackup.words.splice(evt, 1)[0]);
    } else if (this.notAtAll.length < 3) {
      this.notAtAll.push(this.wordBankBackup.words.splice(evt, 1)[0]);
    }
  }
  categoryToWordBank(bank, ind: number) {
    this.wordBankBackup.words.push(this[bank].splice(ind, 1)[0]);
  }
  showSomewhat() {
    return (this.highly.length > 2 && this.somewhat.length < 6);
  }
  showSlightly() {
    return (this.highly.length > 2 && this.somewhat.length > 5 && this.slightly.length < 8);
  }
  showNotVery() {
    return (this.highly.length > 2 && this.somewhat.length > 5 && this.slightly.length > 7 && this.notVery.length < 6);
  }
  showNotAtAll() {
    return (this.highly.length > 2 && this.somewhat.length > 5 && this.slightly.length > 7 && this.notVery.length > 5 && this.notAtAll.length < 3);
  }
  resetCategories() {
    this.highly = [];
    this.somewhat = [];
    this.slightly = [];
    this.notVery = [];
    this.notAtAll = [];
    // Object.assign(this.wordBankBackup, this.wordBank);
    this.wordBankBackup = this.wordBank;
  }
  patchForm() {
    this.parent.patchValue({
      category1: this.highly,
      category2: this.somewhat,
      category3: this.slightly,
      category4: this.notVery,
      category5: this.notAtAll
    });
    this.update.emit(this.parent.value);
  }
  ngOnInit() {
    this.wordBankBackup = this.wordBank;
    console.log(this.parent);
  }

}
