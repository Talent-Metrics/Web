import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomerInterface } from '../../models/customer.interface';

@Component({
  selector: 'app-customer-info-view',
  templateUrl: './customer-info-view.component.html',
  styleUrls: ['./customer-info-view.component.scss']
})

export class CustomerInfoViewComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() customer: CustomerInterface;
  @Output() customerInfo = new EventEmitter<any>();

  formFields = [

    { key: 'firstName', value: 'First Name' },
    { key: 'lastName', value: 'Last Name' },
    { key: 'companyName', value: 'Company' },
    { key: 'email', value: 'E-mail' },
    { key: 'phone', value: 'Phone' },
    { key: 'countryCode', value: 'Country Code' },
    { key: 'taxId', value: 'Tax Id' },
    { key: 'hris', value: 'HRIS' },
    /*
    // { key: 'userId', value: 'User Id' },
    // { key: 'subscribed', value: 'Subscribed' },
    // { key: 'subscriptionId', value: 'Subscription Id' },
    // { key: 'lifetimeValue', value: 'Lifetime Value' },
    // { key: 'creationDate', value: 'Creation Date' },
    // { key: 'closedDate', value: 'Closed Date' },
    // { key: 'updateDate', value: 'Update Date' },
    */
  ];

  constructor() { }

  ngOnInit() {
  }

  getValue(field): string {
    return Object.entries(this.customer).find((g) => g[0] === field)[1];
  }
}
