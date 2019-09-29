import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../models/organization';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  private configUrl = environment.apiUrl + '/organizations';
  organizationForm(customerId: string) {
    const formFields = {
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(4)
      ]),
      customerId: new FormControl(customerId, [
        Validators.required
      ]),
      poc: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      size: new FormControl(0, [
        Validators.required,
        Validators.min(1)
      ]),
      industry: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      annualRevenue: new FormControl('', [
        Validators.required
      ]),
      region: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2)
      ]),
    };
    return new FormGroup(formFields);
  }
  getOrganizationsByCustomerId(customerId: string) {
    return this.http.get(this.configUrl + '/customer/' + customerId);
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
}
