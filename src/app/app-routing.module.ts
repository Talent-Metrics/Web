import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/containers/customers/customers.component';
import { CustomerListComponent } from './customers/containers/customer-list/customer-list.component';
import { SubscriptionsComponent } from './subscriptions/containers/subscriptions/subscriptions.component';
import { SurveySubjectComponent } from './surveys/containers/survey-subject/survey-subject.component';
import { SurveysComponent } from './surveys/containers/surveys/surveys.component';
import { UsersComponent } from './users/containers/users/users.component';
import { EnvironmentComponent } from './environment/containers/environment/environment.component';
import { WordBankComponent } from './word-bank/containers/word-bank/word-bank.component';
import { DashboardComponent } from './dashboard/containers/dashboard/dashboard.component';
import { SurveyExternalComponent } from './surveys/containers/survey-external/survey-external.component';
import { OrganizationListViewComponent } from './organizations/containers/organization-list-view/organization-list-view.component';
import { OrganizationDetailComponent } from './organizations/containers/organization-detail/organization-detail.component';


const routes: Routes = [
  { path: 'portal', component: EnvironmentComponent,
    children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'customers', component: CustomerListComponent },
        { path: 'customers/:id', component: CustomersComponent },
        { path: 'organizations/:id', component: OrganizationDetailComponent ,
          children: [
            {
              path: ':id',
              component: OrganizationDetailComponent
            }
            /*,
            {
              path: '*',
              component: PageNotFound
            }*/
          ]
        },
        { path: 'subscriptions', component: SubscriptionsComponent },
        { path: 'surveysubjects', component: SurveySubjectComponent },
        { path: 'surveys/:id', component: SurveysComponent },
        { path: 'surveys', component: SurveysComponent }, //to be removed
        { path: 'wordbank', component: WordBankComponent },
        { path: 'users', component: UsersComponent },
        /*,
            {
              path: '*',
              component: PageNotFound
            }*/
      ],
  },
  { path: 'survey/:id', component: SurveyExternalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
