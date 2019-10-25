import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomerInterface } from '../../models/customer.interface';

@Component({
  selector: 'app-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.scss']
})
export class AddressViewComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() customer: CustomerInterface;
  @Output() customerInfo = new EventEmitter<any>();

  formFields = [
    { key: 'number', value: 'Street Number', type: 'text', class: 'address_33' },
    { key: 'street', value: 'Street Name', type: 'text', class: 'address_67' },
    { key: 'city', value: 'City', type: 'text', class: 'address_50' },
    { key: 'state', value: 'State', type: 'text', class: 'address_25' },
    { key: 'zip', value: 'Zip Code', type: 'text', class: 'address_25' },
    { key: 'country', value: 'Country', type: 'text', class: 'address_100' }
  ];

  constructor() {
   }

  ngOnInit() {
  }

  getValue(field): string {
    return Object.entries(this.customer.address).find((g) => g[0] === field)[1];
  }

}
