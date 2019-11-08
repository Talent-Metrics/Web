import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../models/organization';
import { OrganizationReference } from '../models/organization-reference';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, of} from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  private configUrl = environment.apiUrl + '/organizations';
  organizationForm() {
    const formFields = {
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(4)
      ]),
      poc: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      size: new FormControl(0, [
        Validators.required
      ]),
      industry: new FormControl('', [
        Validators.required
      ]),
      annualRevenue: new FormControl('', [
        Validators.required
      ]),
      region: new FormControl('', [
        Validators.required,
      ]),
      state: new FormControl('', [
        Validators.required
      ]),
    };
    return new FormGroup(formFields);
  }

  getOrganizationById(id: string): Observable<Organization> {
    return this.http.get<Organization>(this.configUrl + '/id/' + id);
  }

  getOrganizationsByCustomerId(customerId: string): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.configUrl + '/customer/' + customerId)
    .pipe(
      catchError(this.handleError<Organization[]>('getOrganizationsByCustomerId', []))
    );
  }

  getOrganizationReference(): Observable<OrganizationReference[]> {
    return this.http.get<OrganizationReference[]>(this.configUrl + '/reference/')
    .pipe(
      catchError(this.handleError<OrganizationReference[]>('getOrganizationReference', []))
    );
  }

  addOrganization(e: Organization) {
    return this.http.post(this.configUrl, e);
  }

  updateOrganization(id: string, e: Organization) {
    return this.http.put(this.configUrl + '/' + id, e);
  }

  deleteOrganization(id: string) {
    return this.http.delete(this.configUrl + '/' + id);
  }

  constructor(
    private http: HttpClient
  ) { }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
}
}
