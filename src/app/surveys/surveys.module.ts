import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SurveysComponent } from './containers/surveys/surveys.component';
import { SurveyInfoComponent } from './components/survey-info/survey-info.component';
import { SurveySubjectComponent } from './containers/survey-subject/survey-subject.component';
import { SurveySubjectInfoComponent } from './components/survey-subject-info/survey-subject-info.component';
import { SurveyDialogComponent } from './components/survey-dialog/survey-dialog.component';
import { SurveyExternalComponent } from './containers/survey-external/survey-external.component';
import { SurveyPersonalComponent } from './components/survey-personal/survey-personal.component';
import { SurveyCategoriesComponent } from './components/survey-categories/survey-categories.component';
import { SurveyOutputComponent } from './components/survey-output/survey-output.component';
import { SurveyPyramidComponent } from './components/survey-pyramid/survey-pyramid.component';
import { SurveyListComponent } from './components/survey-list/survey-list.component';

@NgModule({
  declarations: [
    SurveysComponent,
    SurveyInfoComponent,
    SurveySubjectComponent,
    SurveySubjectInfoComponent,
    SurveyDialogComponent,
    SurveyExternalComponent,
    SurveyPersonalComponent,
    SurveyCategoriesComponent,
    SurveyOutputComponent,
    SurveyPyramidComponent,
    SurveyListComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [ SurveyListComponent],
  entryComponents: [SurveySubjectInfoComponent, SurveyDialogComponent, SurveyOutputComponent]
})
export class SurveysModule { }
