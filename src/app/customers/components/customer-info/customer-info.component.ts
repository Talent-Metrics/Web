import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {
  @Input()
  parent: FormGroup;
  @Output()
  customerInfo = new EventEmitter<any>();
  formFields = [
    // { key: 'userId', value: 'User Id' },
    { key: 'firstName', value: 'First Name' },
    { key: 'lastName', value: 'Last Name' },
    { key: 'companyName', value: 'Company' },
    { key: 'email', value: 'E-mail' },
    { key: 'phone', value: 'Phone' },
    { key: 'countryCode', value: 'Country Code' },
    // { key: 'subscribed', value: 'Subscribed' },
    // { key: 'subscriptionId', value: 'Subscription Id' },
    // { key: 'lifetimeValue', value: 'Lifetime Value' },
    // { key: 'creationDate', value: 'Creation Date' },
    // { key: 'closedDate', value: 'Closed Date' },
    { key: 'taxId', value: 'Tax Id' },
    { key: 'hris', value: 'HRIS' },
  ];
  constructor() { }

  ngOnInit() {
  }

}
