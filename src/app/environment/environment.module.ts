import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { EnvironmentComponent } from './containers/environment/environment.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [EnvironmentComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule
  ],
  exports: [
    EnvironmentComponent
  ]
})
export class EnvironmentModule { }
