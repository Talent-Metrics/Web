import {Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Word} from '../../../word-bank/models/word';
import {WordBank} from '../../../word-bank/models/word-bank';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import * as $ from 'jquery';
import { Organization } from 'src/app/organizations/models/organization';

@Component({
  selector: 'app-survey-filter',
  templateUrl: './survey-filter.component.html',
  styleUrls: ['./survey-filter.component.scss']
})
export class SurveyFilterComponent implements OnInit {
  allWordBank: Word[] = [];
  moveWordBank: Word[] = [];
  moveWordBank2: Word[] = [];
  moveWordBank3: Word[] = [];
  instructions: number;

  @Input() parent: FormGroup;

  @Input() wordBank: WordBank;

  @Input() org: Organization;

  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  setWordBank() {
    let tempStorage = [];
    tempStorage = Object.assign(tempStorage, this.wordBank.words);
    this.allWordBank = tempStorage;
  }

  closeInstructions() {
    $('html, body').animate({scrollTop: 0}, 'slow');
    $('.survey-cultures').slideDown(500, function() {
      // Animation complete.
      // $('.dot').trigger('focus');
      $( '.survey-instructions').slideUp(1500, function() {
        // Animation complete.
      });
     });

  }

  openInstructions() {
     $( '.survey-instructions').slideDown(1500, function() {
      // Animation complete.
     });
    // $('.survey-instructions').show(1500);
    $( '.survey-cultures').slideUp(2000, function() {
      // Animation complete.
      $('.dot').trigger('focus');
    });

    /*, function() {
      $('html, body').animate({scrollTop:0}, 'slow');
    }*/
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

  setFilters() {
    this.parent.patchValue({
      filter1: this.moveWordBank,
      filter2: this.moveWordBank2,
      filter3: this.moveWordBank3
    });
    console.log(this.parent.value);
    this.update.emit(this.parent.value);
  }

  ngOnInit() {
    this.setWordBank();
    this.instructions = 1;
    $('.survey-instructions').show();
    $('.survey-cultures').hide();
    console.log(this.parent);
  }

}
