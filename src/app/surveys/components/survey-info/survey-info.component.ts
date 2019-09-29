import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {SurveySubject} from '../../models/survey-subject';

@Component({
  selector: 'survey-info',
  templateUrl: './survey-info.component.html',
  styleUrls: ['./survey-info.component.scss']
})
export class SurveyInfoComponent implements OnInit {
  @Input()
  parent: FormGroup;
  @Input()
  fields;
  @Output()
  sendSubject: EventEmitter<SurveySubject> = new EventEmitter<SurveySubject>();
  @Output()
  delete: EventEmitter<Object> = new EventEmitter<Object>();
  get surveySubjects() {
    return (this.parent.get('surveys') as FormArray).controls;
  }
  passSubject(subject: SurveySubject) {
    this.sendSubject.emit(subject);
  }
  deleteSubject(id: string, position: number) {
    this.delete.emit({ id, position });
  }
  constructor() { }

  ngOnInit() {
  }

}
