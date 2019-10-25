import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { CustomerInterface } from '../models/customer.interface';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CUSTOMERS } from './mock-customers';

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
  getCustomerById(id: string): Observable<CustomerInterface> {
    return this.http.get<CustomerInterface>(this.configUrl + '/id/' + id);
  }

  getAllCustomers(): Observable<CustomerInterface[]> {
    return this.http.get<CustomerInterface[]>(this.configUrl)
    .pipe(
      catchError(this.handleError<CustomerInterface[]>('getAllCustomers', []))
    );
  }

  getMockCustomers(): Observable<CustomerInterface[]> {
    return of(CUSTOMERS);
  }

  updateCustomer(id: string, e) {
    return this.http.put(this.configUrl + '/' + id, e);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
}

  constructor(
    private http: HttpClient
  ) { }
}
