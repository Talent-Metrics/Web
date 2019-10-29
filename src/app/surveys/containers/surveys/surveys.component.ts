import {Component, OnDestroy, OnInit} from '@angular/core';
import {Survey} from '../../models/survey';
import {SurveysService} from '../../services/surveys.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SurveySubjectService} from '../../services/survey-subject.service';
import {MatDialog} from '@angular/material';
import {WordBank} from '../../../word-bank/models/word-bank';
import {WordBankService} from '../../../word-bank/services/word-bank.service';
import {SurveyDialogComponent} from '../../components/survey-dialog/survey-dialog.component';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'surveys',
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
        alert(err);
      }, () => { console.log('Update Survey complete'); });
  }

  createSurvey() {
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
      customerId: this.customerId
    });
    this.surveysService.addSurvey(this.surveyForm.value)
      .subscribe((e: Survey) => {
        this.resetForm();
        this.getSurveys(this.customerId);
        alert(`Created survey named: ${e.name}`);
        console.log(e);
      }, err => {
        alert(err);
        console.log(err);
      }, () => console.log('complete add'));
  }

  updateSurvey() {
    this.surveysService.updateSurvey(this.survey._id, this.surveyForm.value)
      .subscribe((e) => {
        alert('updated');
        console.log(e);
        this.getSurveys(this.customerId);
      }, err => {
        alert(err);
        console.log(err);
      }, () => console.log('update complete'));
  }

  deleteSurvey() {
    this.surveysService.deleteSurvey(this.survey._id)
      .subscribe((e) => {
        console.log(e);
        this.getSurveys(this.customerId);
      }, err => {
        alert(err);
        console.log(err);
      }, () => console.log('delete survey complete'));
    this.surveySubjectService.deleteSurveySubjectBySurvey(this.survey._id)
      .subscribe((f) => {
        console.log(f);
      }, err => {
        alert(err);
        console.log(err);
      }, () => console.log('delete subjects complete'));
  }

  getWordBanks(customerId: string) {
    this.wordBankService.getAllByCustomerId(customerId)
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe((e: WordBank[]) => {
        this.wordBanks = e;
    }, err => console.log(err), () => console.log('got word banks'));
  }

  constructor(
    public surveysService: SurveysService,
    public surveySubjectService: SurveySubjectService,
    public wordBankService: WordBankService,
    public dialog: MatDialog,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.customerId = '5c453f7ea0294b2bb92641e0';
    this.surveyForm = this.surveysService.surveyForm();

    this.router.paramMap
    .subscribe((params: ParamMap) => {

      const id: string = params.get('id');
      console.log('Received survey id ' + id);
      this.customerId = params.get('customerId');
      this.organizationId = params.get('organizationId');
      // this.viewType = params.get('viewType');
      // console.log('Get view type ' + this.viewType);
      // this.setupPanels(this.viewType);

      if (id && this.customerId && this.organizationId) {
        console.log('Get surveys by organizations id');
        this.getSurveys(this.organizationId);
        this.getWordBanks(this.customerId);

        // console.log('Get organization by organizations id ');
        // this.getOrganization(id);


        // this.getSurveys(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
