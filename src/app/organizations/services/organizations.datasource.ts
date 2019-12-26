import { CollectionViewer, DataSource} from '@angular/cdk/collections';
import { Organization} from '../models/organization';
import { OrganizationsService } from './organizations.service';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

export class OrganizationsDataSource implements DataSource<Organization> {

  private organizationSubject = new BehaviorSubject<Organization[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private organizationsService: OrganizationsService) {}

  connect(collectionViewer: CollectionViewer): Observable<Organization[]> {
      console.log('Connecting data source');
      return this.organizationSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.organizationSubject.complete();
      this.loadingSubject.complete();
      console.log('Disconnects data source');
  }

  loadOrganizations(customerId: string) {

      this.loadingSubject.next(true);

      this.organizationsService.getOrganizationsByCustomerId(customerId)
      .pipe(
          catchError(() => {
            console.log('Empty collection due to error');
            return of([]);
          }),
          finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(organizations => {
        console.log('Subcribing to data');
        this.organizationSubject.next(organizations);
      });
  }
}
