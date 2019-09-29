import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EnvironmentModule } from './environment/environment.module';
import { CustomersModule } from './customers/customers.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { SurveysModule } from './surveys/surveys.module';
import { UsersModule } from './users/users.module';
import { WordBankModule } from './word-bank/word-bank.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EnvironmentModule,
    CustomersModule,
    OrganizationsModule,
    SubscriptionsModule,
    SurveysModule,
    UsersModule,
    WordBankModule,
    DashboardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
