import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Word } from '../../models/word';
import {FormGroup} from '@angular/forms';
import {WordBankService} from '../../services/word-bank.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
  @Input() parent: FormGroup;
  @Output() updateWord = new EventEmitter<Word>();
  @Output() deleteWord = new EventEmitter<Word>();
  unsubscribe$ = new Subject<void>();
  definition;

  onClickWord(word: Word) {
    this.updateWord.emit(word);
  }

  onClickDelete(word: Word) {
    this.deleteWord.emit(word);
  }
  // wordValues = [1, 2, 3, 4, 5];
  getDefinition() {
    this.wordBankService.getWordDefinition(this.parent.value.name)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(e => {
        this.definition = e;
        console.log(e);
      }, err => console.log(err), () => console.log('complete'));
  }
  setWordValue(value: number) {
    this.parent.patchValue({
      value
    });
  }
  constructor(
    private wordBankService: WordBankService
  ) { }

  ngOnInit() {
    this.getDefinition();
  }

}
