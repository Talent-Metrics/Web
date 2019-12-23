import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {WordBank} from '../../../word-bank/models/word-bank';
import {Word} from '../../../word-bank/models/word';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-survey-pyramid',
  templateUrl: './survey-pyramid.component.html',
  styleUrls: ['./survey-pyramid.component.scss']
})
export class SurveyPyramidComponent implements OnInit {
  @Input()
    parent: FormGroup;
  @Input()
    wordBank: WordBank;
  @Output()
    update: EventEmitter<any> = new EventEmitter<any>();
  // selectedWord;
  allWordBank: Word[] = [];
  // ------------------------
  importedWordBank: Word[] = [];
  selectedIndex: number;
  instructions: number;
  veryDescriptive: Word[] = [];
  somewhatDescriptive: Word[] = [];
  slightlyDescriptive: Word[] = [];
  notVeryDescriptive: Word[] = [];
  notAtAllDescriptive: Word[] = [];

  dragWord(i: number) {
    this.selectedIndex = i;
  }

  allowDrop(evt) {
    evt.preventDefault();
  }

  drop(section, evt) {
    evt.preventDefault();
    this[section].push(this.importedWordBank.splice(this.selectedIndex, 1)[0]);
    evt.target.classList.remove('utility__opacity-50');
  }

  dropEvent(event: CdkDragDrop<Word[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      /*
      console.log('previousContainer= ' + JSON.stringify(event.previousContainer.data));
      console.log('container= ' + JSON.stringify(event.container.data));
      console.log('previousIndex= ' + JSON.stringify(event.previousIndex));
      console.log('currentIndex= ' + JSON.stringify(event.currentIndex));
      */
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  closeInstructions() {
    this.instructions = 0;
  }

  setWordBank() {
    let tempStorage = [];
    tempStorage = Object.assign(tempStorage, this.wordBank.words);
    this.importedWordBank = tempStorage;
    this.allWordBank = tempStorage;
  }
  resetSurvey() {
    this.selectedIndex = undefined;
    this.veryDescriptive = [];
    this.somewhatDescriptive = [];
    this.slightlyDescriptive = [];
    this.notVeryDescriptive = [];
    this.notAtAllDescriptive = [];
    this.setWordBank();
  }
  showInstructions() {
    if (!~~this.instructions) {
      this.instructions = 1;
    }
  }
  tester(a) {
    if (!a.target.classList.contains('utility__opacity-50')) {
      a.target.classList.add('utility__opacity-50');
    }
  }
  tester2(a) {
    if (a.target.classList.contains('utility__opacity-50')) {
      a.target.classList.remove('utility__opacity-50');
    }
  }
  setCategories() {
    this.parent.patchValue({
      category1: this.veryDescriptive,
      category2: this.somewhatDescriptive,
      category3: this.slightlyDescriptive,
      category4: this.notVeryDescriptive,
      category5: this.notAtAllDescriptive
    });
    console.log(this.parent.value);
    this.update.emit(this.parent.value);
  }
  constructor() { }

  ngOnInit() {
    this.setWordBank();
    this.instructions = 1;
    console.log(this.parent);
  }

}
