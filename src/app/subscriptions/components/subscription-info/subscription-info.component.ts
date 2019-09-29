import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'subscription-info',
  templateUrl: './subscription-info.component.html',
  styleUrls: ['./subscription-info.component.scss']
})
export class SubscriptionInfoComponent implements OnInit {
  @Input()
  parent: FormGroup;
  @Input()
  formFields;
  subTypes = [
    { key: 1, value: 'Monthly' },
    { key: 2, value: 'Survey Count' },
    { key: 3, value: 'Annually' },
    { key: 4, value: 'Single Survey' }
  ];
  chgSubType(evt) {
    this.parent.patchValue({
      subscriptionType: evt.value
    });
  }
  constructor() { }

  ngOnInit() {
  }

}
