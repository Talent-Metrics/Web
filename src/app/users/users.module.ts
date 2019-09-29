import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { UsersComponent } from './containers/users/users.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [UsersComponent, UserInfoComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class UsersModule { }
