import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { OrganizationsModule } from '../organizations/organizations.module';

// Components
import { CustomersComponent } from './containers/customers/customers.component';
import { CustomerListComponent } from './containers/customer-list/customer-list.component';
import { AddressComponent } from './components/address/address.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { AppMapComponent } from './components/app-map/app-map.component';
import { AddressViewComponent } from './components/address-view/address-view.component';
import { CustomerInfoViewComponent } from './components/customer-info-view/customer-info-view.component';

@NgModule({
  declarations: [
    CustomersComponent,
    AddressComponent,
    CustomerInfoComponent,
    AppMapComponent,
    CustomerListComponent,
    AddressViewComponent,
    CustomerInfoViewComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    OrganizationsModule
  ],
  exports: [
    CustomersComponent, CustomerListComponent
  ]
})
export class CustomersModule { }
