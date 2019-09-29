import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/containers/customers/customers.component';
import { OrganizationsComponent } from './organizations/containers/organizations/organizations.component';
import { SubscriptionsComponent } from './subscriptions/containers/subscriptions/subscriptions.component';
import { SurveySubjectComponent } from './surveys/containers/survey-subject/survey-subject.component';
import { SurveysComponent } from './surveys/containers/surveys/surveys.component';
import { UsersComponent } from './users/containers/users/users.component';
import { EnvironmentComponent } from './environment/containers/environment/environment.component';
import { WordBankComponent } from './word-bank/containers/word-bank/word-bank.component';
import { DashboardComponent } from './dashboard/containers/dashboard/dashboard.component';
import { SurveyExternalComponent } from './surveys/containers/survey-external/survey-external.component';

const routes: Routes = [
  { path: 'portal', component: EnvironmentComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'organizations', component: OrganizationsComponent },
      { path: 'subscriptions', component: SubscriptionsComponent },
      { path: 'surveysubjects', component: SurveySubjectComponent },
      { path: 'surveys', component: SurveysComponent },
      { path: 'wordbank', component: WordBankComponent },
      { path: 'users', component: UsersComponent }
    ], },
  { path: 'survey/:id', component: SurveyExternalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
