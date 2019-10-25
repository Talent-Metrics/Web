import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { CustomerInterface } from '../models/customer.interface';
import { CustomersService } from './customers.service';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators'; //import { catchError, map, tap } from 'rxjs/operators';

export class CustomersDataSource implements DataSource<CustomerInterface> {

  private customerSubject = new BehaviorSubject<CustomerInterface[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private customerService: CustomersService) {}

  connect(collectionViewer: CollectionViewer): Observable<CustomerInterface[]> {
      console.log("Connecting data source");
      return this.customerSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.customerSubject.complete();
      this.loadingSubject.complete();
      console.log("Disconnects data source");
  }

  //loadCustomers(courseId: number, filter = '',
  //            sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

  loadCustomers() {

      this.loadingSubject.next(true);

      this.customerService.getAllCustomers()
      .pipe(
          catchError(() =>
          {
            console.log("Empty collection due to error");
            return of([])
          }),
          finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(lessons =>{
        console.log("Subcribing to data ");
        this.customerSubject.next(lessons)}
        );
  }
}
