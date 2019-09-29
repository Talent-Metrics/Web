import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subscription} from '../models/subscription';
import {FormControl, FormGroup} from '@angular/forms';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  private configUrl = environment.apiUrl + '/subscriptions';
  subscriptionForm() {
    const formFields = {
      autoRenew: new FormControl(0),
      customerId: new FormControl(''),
      endDate: new FormControl({value: 0, disabled: true}),
      maxSurveys: new FormControl({value: 0, disabled: true}),
      startDate: new FormControl(0),
      subscriptionName: new FormControl({value: '', disabled: true}),
      subscriptionType: new FormControl(0),
      surveyCount: new FormControl({value: 0, disabled: true})
    };
    return new FormGroup(formFields);
  }
  getSubscriptionsByCustomerId(customerId: string) {
    return this.http.get(this.configUrl + '/customer/' + customerId);
  }
  updateSubscription(id: string, sub: Subscription) {
    return this.http.put(this.configUrl + '/' + id, sub);
  }
  constructor(
    private http: HttpClient
  ) { }
}
