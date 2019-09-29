import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import {FormControl, FormGroup} from '@angular/forms';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private configUrl = environment.apiUrl + '/users';
  private configUrl2 = environment.apiUrl + '/users/id';
  fields = [
    { key: 'username', value: 'Username', type: 'text' },
    { key: 'password', value: 'Password', type: 'password' },
    { key: 'customerId', value: 'Customer Id', type: 'text' },
    { key: 'lockedOut', value: 'Locked Out', type: 'boolean' },
    { key: 'failedAttempts', value: 'Failed Attempts', type: 'number' },
  ];
  userForm() {
    const formFields = {};
    this.fields.forEach(e => {
      if (e.type === 'text' || e.type === 'password') {
        formFields[e.key] = new FormControl('');
      } else if (e.type === 'number') {
        formFields[e.key] = new FormControl(0);
      } else if (e.type === 'boolean') {
        formFields[e.key] = new FormControl(false);
      }
    });
    return new FormGroup(formFields);
  }
  getUser(id: string) {
    return this.http.get(this.configUrl2 + '/' + id);
  }
  getUsersByCustomerId(custId: string) {
    return this.http.get(this.configUrl + '/customer/' + custId);
  }
  updateUser(id: string, user: User) {
    return this.http.put(this.configUrl + '/' + id, user);
  }
  constructor(
    private http: HttpClient
  ) { }
}
