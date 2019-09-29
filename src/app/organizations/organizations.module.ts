import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { OrganizationsComponent } from './containers/organizations/organizations.component';
import { OrganizationInfoComponent } from './components/organization-info/organization-info.component';
import { OrganizationDialogComponent } from './components/organization-dialog/organization-dialog.component';

@NgModule({
  declarations: [
    OrganizationsComponent,
    OrganizationInfoComponent,
    OrganizationDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    OrganizationsComponent
  ],
  entryComponents: [
    OrganizationDialogComponent
  ]
})
export class OrganizationsModule { }
