import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import { CustomerInterface } from '../models/customer.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private configUrl = environment.apiUrl + '/customers';
  private dataSource = new BehaviorSubject<CustomerInterface>(undefined);
  data = this.dataSource.asObservable();
  customerForm() {
    const formObj = {
      address: new FormGroup({
        number: new FormControl('', [
          Validators.required
        ]),
        street: new FormControl('', [
          Validators.required
        ]),
        city: new FormControl('', [
          Validators.required
        ]),
        state: new FormControl('', [
          Validators.required
        ]),
        zip: new FormControl('', [
          Validators.required
        ]),
        country: new FormControl('', [
          Validators.required
        ])
      }),
      userId: new FormControl('', [
        Validators.required
      ]),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      companyName: new FormControl(''),
      email: new FormControl('', [
        Validators.required
      ]),
      phone: new FormControl(''),
      countryCode: new FormControl(''),
      subscribed: new FormControl(false, [
        Validators.required
      ]),
      subscriptionId: new FormControl(''),
      lifetimeValue: new FormControl(0),
      creationDate: new FormControl(0, [
        Validators.required
      ]),
      closedDate: new FormControl(0),
      taxId: new FormControl(0),
      hris: new FormControl(''),
    };
    return new FormGroup(formObj);
  }
  getCustomerById(id: string) {
    return this.http.get(this.configUrl + '/id/' + id);
  }
  updateCustomer(id: string, e) {
    return this.http.put(this.configUrl + '/' + id, e);
  }
  constructor(
    private http: HttpClient
  ) { }
}
