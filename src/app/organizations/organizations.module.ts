import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { OrganizationDetailComponent } from './containers/organization-detail/organization-detail.component';
import { OrganizationInfoComponent } from './components/organization-info/organization-info.component';
import { OrganizationDialogComponent } from './components/organization-dialog/organization-dialog.component';
import { OrganizationListComponent } from './components/organization-list/organization-list.component';
import { OrganizationListViewComponent } from './containers/organization-list-view/organization-list-view.component';
import { OrganizationViewComponent } from './containers/organization-view/organization-view.component';
// import { OrganizationsRoutingModule } from './organizations-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    // OrganizationsRoutingModule
  ],
  declarations: [
    OrganizationDetailComponent,
    OrganizationInfoComponent,
    OrganizationDialogComponent,
    OrganizationListComponent,
    OrganizationListViewComponent,
    OrganizationViewComponent
  ],
  exports: [
    OrganizationDetailComponent,
    OrganizationListComponent,
    OrganizationListViewComponent
  ],
  entryComponents: [
    OrganizationDialogComponent
  ]
})
export class OrganizationsModule { }
