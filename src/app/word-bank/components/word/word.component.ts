import { Component, Input, OnInit } from '@angular/core';
import { Word } from '../../models/word';
import {FormGroup} from '@angular/forms';
import {WordBankService} from '../../services/word-bank.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
  @Input()
    word: FormGroup;
  unsubscribe$ = new Subject<void>();
  definition;
  wordValues = [1, 2, 3, 4, 5];
  getDefinition() {
    this.wordBankService.getWordDefinition(this.word.value.name)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(e => {
        this.definition = e;
        console.log(e);
      }, err => console.log(err), () => console.log('complete'));
  }
  setWordValue(value: number) {
    this.word.patchValue({
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
