import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { MatTooltipModule} from '@angular/material/tooltip';

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
import { SurveyUploadComponent } from './components/survey-upload/survey-upload.component';
import { SurveyConfirmationComponent } from './components/survey-confirmation/survey-confirmation.component';
import { SurveyFilterComponent } from './components/survey-filter/survey-filter.component';
import { SurveyTowerComponent } from './components/survey-tower/survey-tower.component';
import { SurveyThankyouComponent } from './components/survey-thankyou/survey-thankyou.component';

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
    SurveyListComponent,
    SurveyUploadComponent,
    SurveyConfirmationComponent,
    SurveyFilterComponent,
    SurveyTowerComponent,
    SurveyThankyouComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    MatFileUploadModule,
    DragDropModule,
    MatTooltipModule
  ],
  exports: [ SurveyListComponent, SurveyDialogComponent],
  entryComponents: [SurveySubjectInfoComponent, SurveyDialogComponent, SurveyOutputComponent, SurveyUploadComponent,
  SurveyConfirmationComponent]
})
export class SurveysModule { }
