import {Component, OnDestroy, OnInit} from '@angular/core';
import {Survey} from '../../models/survey';
import {SurveysService} from '../../services/surveys.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SurveySubjectService} from '../../services/survey-subject.service';
import {MatDialog} from '@angular/material';
import {WordBank} from '../../../word-bank/models/word-bank';
import {WordBankService} from '../../../word-bank/services/word-bank.service';
import {SurveyDialogComponent} from '../../components/survey-dialog/survey-dialog.component';
import { SurveyConfirmationComponent} from '../../components/survey-confirmation/survey-confirmation.component';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})

export class SurveysComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  surveys: Survey[];
  wordBanks: WordBank[];
  survey: Survey;
  surveyId = new Subject<string>();
  customerId: string;
  organizationId: string;
  wordBankId = new Subject<string>();
  surveyForm = new FormGroup({});
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  getSurveys(organizationId: string) {
    this.surveysService.getSurveysByOrganizationsId(organizationId)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((e: Survey[]) => {
        this.surveys = e;
      }, err => {
        console.log(err);
        alert(err);
      }, () => { console.log('Get Surveys complete'); });
  }

  setupSurvey(surveyId: string) {
    this.surveysService.getSurveyById(surveyId)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((e: Survey) => {
        this.selectSurvey(e);
      }, err => {
        console.log(err);
      }, () => { console.log('Survey setup complete'); });
  }

  selectSurvey(surv: Survey) {
    this.surveyForm.reset();
    this.survey = surv;
    this.wordBankId.next(surv.wordBankId);
    this.surveyId.next(surv._id);
    this.surveyForm.patchValue(surv);
  }

  resetForm() {
    this.survey = undefined;
    this.surveyId.next('');
    this.surveyForm.reset();
  }

  onSubmit() {
    this.surveysService.updateSurvey(this.survey._id, this.surveyForm.value)
      .subscribe((e) => {
        console.log(e);
      }, err => {
        console.log(err);
      }, () => { console.log('Update Survey complete'); });
  }

  createSurvey() {
    this.surveyForm.reset();
    const dialogRef = this.dialog.open(SurveyDialogComponent, {
      width: '700px',
      data: {
        type: 'add',
        form: this.surveyForm,
        wordBanks: this.wordBanks
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.surveyForm.patchValue(result);
          this.addSurvey();
        }
      }, err => console.log(err), () => console.log('dialog closed'));
  }

  addSurvey() {
    this.surveyForm.patchValue({
      customerId: this.customerId,
      organizationId: this.organizationId,
      subjects: 0,
      completed: 0
    });

    this.surveysService.addSurvey(this.surveyForm.value)
      .subscribe((e: Survey) => {
        this.getSurveys(this.organizationId);
        this.selectSurvey(e);
        this._snackBar.open(`Created survey named: ${e.name}`, 'Clear', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      }, err => {
        console.log(err);
      }, () => console.log('complete add'));
  }

  updateSurvey() {
    this.surveysService.updateSurvey(this.survey._id, this.surveyForm.value)
      .subscribe((e) => {
        console.log(e);
        this.getSurveys(this.organizationId);
        this._snackBar.open(`Survey is updated`, 'Clear', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      }, err => {
        console.log(err);
      }, () => console.log('update complete'));
  }

  deleteSurvey() {
    this.surveysService.deleteSurvey(this.survey._id)
      .subscribe((e) => {
        console.log(e);
        this.getSurveys(this.organizationId);
        this.resetForm();
      }, err => {
        console.log(err);
      }, () => console.log('delete survey complete'));
    this.surveySubjectService.deleteSurveySubjectBySurvey(this.survey._id)
      .subscribe((f) => {
        this._snackBar.open(`Survey and survey subjects are deleted`, 'Clear', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        console.log(f);
      }, err => {
        console.log(err);
      }, () => console.log('delete subjects complete'));
  }

  getWordBanks() {
    this.wordBankService.getAll()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe((e: WordBank[]) => {
        this.wordBanks = e;
    }, err => console.log(err), () => console.log('got word banks'));
  }

  confirmationDialogMessage(title: string, message: string, button: string, successCall, args) {
    const dialogRef = this.dialog.open(SurveyConfirmationComponent, {
      width: '400px',
      height: '250px',
      data: {
        dialogTitle: title,
        dialogMessage: message,
        dialogSuccessButton: button
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          successCall.apply(this, args);
        }
      },
      err => console.log(err),
      () => console.log('Confirmation complete'));
  }

  constructor(
    public surveysService: SurveysService,
    public surveySubjectService: SurveySubjectService,
    public wordBankService: WordBankService,
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.surveyForm = this.surveysService.surveyForm();

    this.router.paramMap
    .subscribe((params: ParamMap) => {

      const id: string = params.get('id');
      console.log('Received survey id ' + id);
      this.customerId = params.get('customerId');
      this.organizationId = params.get('organizationId');

      if (id && this.customerId && this.organizationId) {
        console.log('Get surveys by organizations id');
        this.getSurveys(this.organizationId);
        this.getWordBanks();
        this.setupSurvey(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
