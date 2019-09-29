import {Component, OnInit, OnDestroy} from '@angular/core';
import { CustomersService } from '../../services/customers.service';

import { CustomerInterface } from '../../models/customer.interface';
import { FormControl, FormGroup } from '@angular/forms';
import {take, takeUntil, skip} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private customer$ = new Subject<CustomerInterface>();
  customers: CustomerInterface[];
  customer: CustomerInterface;
  customerForm: FormGroup;
  getCustomer(id: string) {
    this.customersService.getCustomerById(id)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data: CustomerInterface) => {
        this.customer = data;
        this.customerForm.patchValue(this.customer);
      }, err => {
        console.log(err);
        alert(err);
      }, () => { console.log('Get Customer complete'); });
  }
  onSubmit() {
    console.log(this.customerForm.value);
    this.customersService.updateCustomer(this.customer._id, this.customerForm.value)
      .subscribe((e) => {
        alert(`Your customer record has been successfully updated`);
        console.log(e);
      }, err => {
        console.log(err);
        alert(err);
      }, () => { console.log('Update Customer complete'); });
  }
  testEmit(evt) {
    console.log(evt);
  }
  constructor(
    private customersService: CustomersService
  ) { }
  ngOnInit() {
    this.getCustomer('5c429b0a1c9d4400005b4830');
    this.customerForm = this.customersService.customerForm();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
