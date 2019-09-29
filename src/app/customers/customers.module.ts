import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

// Components
import { CustomersComponent } from './containers/customers/customers.component';
import { AddressComponent } from './components/address/address.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [CustomersComponent, AddressComponent, CustomerInfoComponent, MapComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    CustomersComponent
  ]
})
export class CustomersModule { }
