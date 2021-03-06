import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input() parent: FormGroup;
  @Output() address = new EventEmitter<any>();

  formFields = [
    { key: 'number', value: 'Street Number', type: 'text', class: 'address_33' },
    { key: 'street', value: 'Street Name', type: 'text', class: 'address_67' },
    { key: 'city', value: 'City', type: 'text', class: 'address_50' },
    { key: 'state', value: 'State', type: 'text', class: 'address_25' },
    { key: 'zip', value: 'Zip Code', type: 'text', class: 'address_25' },
    { key: 'country', value: 'Country', type: 'text', class: 'address_100' }
  ];

  verifiedAddress(evt) {
    this.parent.get('address').patchValue(evt);
    this.parent.markAsDirty();
  }
  // updateAddress() {
  //   this.address.emit(this.parent.get('address').value);
  // }
  constructor() { }

  ngOnInit() {
  }

}
