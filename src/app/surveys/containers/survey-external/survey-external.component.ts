import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Survey } from '../../models/survey';
import { SurveySubject} from '../../models/survey-subject';
import { SurveySubjectService} from '../../services/survey-subject.service';
import { SurveysService} from '../../services/surveys.service';
import { OrganizationsService} from '../../../organizations/services/organizations.service';
import { take, takeUntil} from 'rxjs/operators';
import { Subject} from 'rxjs';
import { FormArray, FormControl, FormGroup} from '@angular/forms';
import { WordBankService} from '../../../word-bank/services/word-bank.service';
import { WordBank} from '../../../word-bank/models/word-bank';
import { Word } from '../../../word-bank/models/word';
import { MatDialog} from '@angular/material';
import { SurveyMessageComponent} from '../../components/survey-message/survey-message.component';
import { Organization } from 'src/app/organizations/models/organization';

@Component({
  selector: 'app-survey-external',
  templateUrl: './survey-external.component.html',
  styleUrls: ['./survey-external.component.scss']
})
export class SurveyExternalComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  id: string;
  surveyId: string;
  survey: Survey;
  surveySubjects: SurveySubject[];
  surveySubject: SurveySubject;
  surveySubjectForm: FormGroup;
  wordBank: WordBank;
  filter1: Word[] = [];
  filter2: Word[] = [];
  filter3: Word[] = [];
  step = 1;
  completed: boolean;
  organization: Organization;

  getSurveySubjectById() {
    this.surveySubjectService.getSurveySubjectById(this.id)
      .pipe(
        take(1)
      ).subscribe((result: SurveySubject) => {
        if (result) {
          if (result.surveyInfo.completed) {
            this.step = 6;
            this.completed = true;
            this.surveyId = result.surveyInfo.surveyId;
          }
          this.organizationsService.getOrganizationById(result.surveyInfo.organizationId)
          .subscribe((org: Organization) => {
            this.organization = org;
          });
          this.surveySubject = result;
          this.surveySubjectForm = this.surveySubjectService.surveySubjectForm(result);
          this.getWordBank(result.surveyInfo.wordBankId);
          this.getSurvey(result.surveyInfo.surveyId);
        } else {
          // Hide everything and show an error
          this.step = -1;
        }
    }, err => console.log(err), () => console.log('finished'));
  }
  getWordBank(wordBankId: string) {
    this.wordBankService.getOne(wordBankId)
      .pipe(
        take(1)
      ).subscribe((wb: WordBank) => {
        this.wordBank = wb;
    }, err => console.log(err), () => console.log('got word bank'));
  }
  get personalInfo() {
    if (this.surveySubjectForm.get('personalInfo')) {
      return this.surveySubjectForm.get('personalInfo') as FormGroup;
    }
  }
  get categories() {
    if (this.surveySubjectForm.get('categories')) {
      return this.surveySubjectForm.get('categories') as FormGroup;
    }
  }
  get filters() {
    if (this.surveySubjectForm.get('filters')) {
      return this.surveySubjectForm.get('filters') as FormGroup;
    }
  }
  setStep(which: number) {
    this.step = which;
  }
  setPersonal(evt) {
    if (evt.dirty) {
      this.surveySubjectForm.patchValue({
        personalInfo: evt.values
      });
    }
    this.step = 2;
  }

  setIntro(evt) {
    if (evt.intro) {
      this.step = 3;
    }
  }

  setFilters(evt) {
    console.log(evt);
    this.surveySubjectForm.patchValue({evt});
    const group = this.surveySubjectForm.get('filters') as FormGroup;
    this.filter1 = group.get('filter1').value as Word[];
    this.filter2 = group.get('filter2').value as Word[];
    this.filter3 = group.get('filter3').value as Word[];
    this.step = 4;
  }

  setCategories(evt) {
    console.log(evt);
    this.surveySubjectForm.patchValue(evt);
    this.step = 5;
  }

  checkFormForFinal() {
    if (this.surveySubjectForm.valid) {
      this.surveySubjectForm.patchValue({
        surveyInfo: {
          completed: true,
          completionDate: new Date()
        }
      });
      return true;
    } else {
      return false;
    }
  }

  updateSurveySubject() {
    const surveyTitle = 'Survey Confirmation';
    if (this.checkFormForFinal()) {
      // possible spinner
      this.surveySubjectService.updateSurveySubjects(this.surveySubject._id, this.surveySubjectForm.value)
        .subscribe(result => {
          this.dialogMessage(surveyTitle, 'Your survey has been successfully submitted and saved.');
          this.getSurveySubjectById();
          this.refreshSurveyCounts();
        },
        err => {
          console.log(err);
          this.dialogMessage(surveyTitle, 'Your survey was not successfully submitted. Please resubmit the survey.');
        },
        () => {
          console.log('updateSurveySubject completed');
        });
      } else {
        this.dialogMessage(surveyTitle, 'Form is invalid and unable to submit');
      }
  }

  getSurvey(surveyId: string) {
    this.surveysService.getSurveyById(surveyId)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((e: Survey) => {
        this.survey = e;
      },
      err => console.log(err), () => console.log('complete survey pull')
      );
  }

  refreshSurveyCounts() {
    this.surveySubjectService.getSurveySubjectsBySurvey(this.surveySubject.surveyInfo.surveyId)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((e: SurveySubject[]) => {
        this.surveySubjects = e;
        let surveyCompleted = 0;
        for (const subjectSubject of this.surveySubjects) {
          if (subjectSubject.surveyInfo.completed || subjectSubject._id === this.surveySubject._id) {
            surveyCompleted++;
          }
        }
        this.survey.completed = surveyCompleted;
        this.survey.subjects = e.length;
        this.surveysService.updateSurvey(this.surveySubject.surveyInfo.surveyId, this.survey)
        .subscribe(s => {
          console.log('Update survey count and completed = ' + JSON.stringify(s));
        }, err => console.log('Survey count error: ' + err),
        () => console.log('Survey counts are updated'));
      },
      err => console.log(err), () => console.log('complete survey subject pull')
      );
  }

  dialogMessage(title: string, message: string) {
    const dialogRef = this.dialog.open(SurveyMessageComponent, {
      width: '350px',
      data: {
        dialogTitle: title,
        dialogMessage: message,
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          // message only has one result
        }
      },
      err => console.log(err), () => console.log('update complete'));
    }

  constructor(
    private route: ActivatedRoute,
    private surveySubjectService: SurveySubjectService,
    private surveysService: SurveysService,
    private organizationsService: OrganizationsService,
    private wordBankService: WordBankService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSurveySubjectById();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
