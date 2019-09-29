import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SubscriptionsComponent } from './containers/subscriptions/subscriptions.component';
import { SubscriptionInfoComponent } from './components/subscription-info/subscription-info.component';

@NgModule({
  declarations: [SubscriptionsComponent, SubscriptionInfoComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SubscriptionsModule { }
