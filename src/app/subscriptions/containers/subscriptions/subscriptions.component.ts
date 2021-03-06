import {Component, OnInit, OnDestroy } from '@angular/core';
import {SubscriptionsService} from '../../services/subscriptions.service';
import {Subscription} from '../../models/subscription';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  subs: Subscription[];
  sub: Subscription;
  customerId: string;
  subscriptionForm = new FormGroup({});
  formFields = [
    { key: 'autoRenew', value: 'Autorenew' },
    { key: 'customerId', value: 'Customer Id' },
    { key: 'endDate', value: 'End Date' },
    { key: 'maxSurveys', value: 'Maximum # of Surveys' },
    { key: 'startDate', value: 'Start Date' },
    { key: 'subscriptionName', value: 'Subscription' },
    { key: 'subscriptionType', value: 'Subscription Type' },
    { key: 'surveyCount', value: '# of Surveys' },
  ];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  getSubscriptions(customerId: string) {
    this.subscriptionsService.getSubscriptionsByCustomerId(customerId)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((e: Subscription[]) => {
        this.subs = e;
        this.mockTest();
      }, err => {
        console.log(err);
        this._snackBar.open(`Error, please check log`, 'Clear', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      }, () => {
        console.log('Get Subscriptions complete');
      });
  }
  onSubmit() {
    this.subscriptionsService.updateSubscription(this.sub._id, this.subscriptionForm.value)
      .subscribe((e) => {
        console.log(e);
      }, err => {
        console.log(err);
        this._snackBar.open(`Error, please check log`, 'Clear', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      }, () => { console.log('Update Subscription complete'); });
  }
  mockTest() {
    this.sub = this.subs[0];
    this.subscriptionForm.patchValue(this.sub);
  }
  constructor(
    private subscriptionsService: SubscriptionsService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.customerId = '5c429b0a1c9d4400005b4830';
    this.getSubscriptions(this.customerId);
    this.subscriptionForm = this.subscriptionsService.subscriptionForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
