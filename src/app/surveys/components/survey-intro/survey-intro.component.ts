import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import { Organization } from 'src/app/organizations/models/organization';

@Component({
  selector: 'app-survey-intro',
  templateUrl: './survey-intro.component.html',
  styleUrls: ['./survey-intro.component.scss']
})
export class SurveyIntroComponent implements OnInit {
  @Input() org: Organization;

  @Output()
    update: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  confirmIntro() {
    this.update.emit({
      intro: true
    });
  }

}
