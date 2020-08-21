import {Component, OnInit, EventEmitter, Input, Output, AfterViewInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Word} from '../../../word-bank/models/word';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import * as $ from 'jquery';

@Component({
  selector: 'app-survey-tower',
  templateUrl: './survey-tower.component.html',
  styleUrls: ['./survey-tower.component.scss']
})
export class SurveyTowerComponent implements OnInit {
  moveWordBank: Word[] = [];
  moveWordBank2: Word[] = [];
  moveWordBank3: Word[] = [];

  cell1: Word[] = [];
  cell2: Word[] = [];
  cell3: Word[] = [];
  cell4: Word[] = [];
  cell5: Word[] = [];
  cell6: Word[] = [];
  cell7: Word[] = [];
  cell8: Word[] = [];
  cell9: Word[] = [];
  cell10: Word[] = [];
  cell11: Word[] = [];
  cell12: Word[] = [];
  cell13: Word[] = [];
  cell14: Word[] = [];
  cell15: Word[] = [];
  cell16: Word[] = [];
  cell17: Word[] = [];
  cell18: Word[] = [];
  cell19: Word[] = [];
  cell20: Word[] = [];
  cell21: Word[] = [];
  cell22: Word[] = [];
  cell23: Word[] = [];
  cell24: Word[] = [];
  cell25: Word[] = [];
  cell26: Word[] = [];

  @Input() filters: FormGroup;

  @Input() categories: FormGroup;

  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  @Input() filter1: Word[];

  @Input() filter2: Word[];

  @Input() filter3: Word[];

  // @Output() updateFilters: EventEmitter<any> = new EventEmitter<any>();

  closeInstructions() {
    $('html, body').animate({scrollTop: 0}, 'slow');
    $( '.survey-instructions').slideUp(1500, function() {
      // Animation complete.
      $('.dot').trigger('focus');
    });
  }

  openInstructions() {
     $( '.survey-instructions').slideDown(1500, function() {
      // Animation complete.
      $('.utility__button--primary').trigger('focus');
     });
  }

  dropEvent(event: CdkDragDrop<Word[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      console.log('previousContainer= ' + JSON.stringify(event.previousContainer.data));
      console.log('container= ' + JSON.stringify(event.container.data));
      console.log('previousIndex= ' + JSON.stringify(event.previousIndex));
      console.log('currentIndex= ' + JSON.stringify(event.currentIndex));
      console.log('classList = ' + event.container.element.nativeElement.classList.value);

      if (event.container.data && event.container.data.length > 0
        && event.container.element.nativeElement.classList.value.indexOf('item') > -1) {
        // item in the cell
        // copy current item
        console.log('Move extra item back');

        transferArrayItem(event.container.data,
          event.previousContainer.data,
          0,
          event.previousContainer.data.length);

        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          0);
      } else {
        console.log('Transfer item');
        transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      }
    }

  }


  setCategories() {
    this.categories.patchValue({
      category1: this.cell1.concat(this.cell2),
      category2: this.cell3.concat(this.cell4).concat(this.cell5),
      category3: this.cell6.concat(this.cell7).concat(this.cell8).concat(this.cell9).concat(this.cell10),
      category4: this.cell11.concat(this.cell12).concat(this.cell13).concat(this.cell14).concat(this.cell15).concat(this.cell16),
      category5: this.cell17.concat(this.cell18).concat(this.cell19).concat(this.cell20).concat(this.cell21),
      category6: this.cell22.concat(this.cell23).concat(this.cell24),
      category7: this.cell25.concat(this.cell26)
    });

    console.log(this.categories.value);
    this.update.emit(this.categories.value);
  }

  constructor() { }

  ngOnInit() {
    $('.survey-instructions').show();
  }

}
