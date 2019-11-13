import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SurveySubject } from '../../models/survey-subject';
import { Survey } from '../../models/survey';
import { SurveySubjectService } from '../../services/survey-subject.service';
import { SurveysService } from '../../services/surveys.service';
import { Observable, Subject} from 'rxjs';
import { take, takeUntil} from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { SurveySubjectInfoComponent } from '../../components/survey-subject-info/survey-subject-info.component';
import { SurveyUploadComponent } from '../../components/survey-upload/survey-upload.component';
import * as moment from 'moment';

@Component({
  selector: 'app-survey-subject',
  templateUrl: './survey-subject.component.html',
  styleUrls: ['./survey-subject.component.scss']
})
export class SurveySubjectComponent implements OnInit, OnDestroy {
  @Input() surveyId: Subject<string>;
  @Input() wordBankId: Subject<string>;
  @Input() customerId: string;
  @Input() organizationId: string;
  surveyId$: string;
  wordBankId$: string;
  unsubscribe$ = new Subject<void>();
  surveySubjects: SurveySubject[];
  survey: Survey;
  type: string;

  getSurveySubjects(surveyId: string) {
    this.surveySubjectService.getSurveySubjectsBySurvey(surveyId)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((e: SurveySubject[]) => {
        this.surveySubjects = e;
      },
      err => console.log(err), () => console.log('complete survey subject pull')
      );
  }

  getSurvey(surveyId: string) {
    this.surveyService.getSurveyById(surveyId)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((e: Survey) => {
        this.survey = e;
      },
      err => console.log(err), () => console.log('complete survey subject pull')
      );
  }

  uploadSurvey() {
    const dialogRef = this.dialog.open(SurveyUploadComponent, {
      width: '500px',
      data: {
        type: 'upload',
        survey: this.survey,
        surveyInfo: {
          customerId: this.customerId,
          organizationId: this.organizationId,
          surveyId: this.surveyId$,
          wordBankId: this.wordBankId$,
          createDate: moment().toJSON()
        }
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          if (result.success > 0) {
            this.getSurveySubjects(this.surveyId$);
          }
        }
      }, err => console.log(err), () => console.log('dialog closed'));
  }

  viewSurveySubject(a: SurveySubject) {
    const surveySubjectForm = this.surveySubjectService.surveySubjectForm(a);
    const dialogRef = this.dialog.open(SurveySubjectInfoComponent, {
      width: '700px',
      height: '500px',
      data: {
        form: surveySubjectForm,
        type: 'view',
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result && !result.pristine) {
          this.updateSurveySubject(result.value._id, result.value);
        } else {
          console.log('No changes');
        }
      });
  }

  updateSurveySubject(id: string, sub: SurveySubject) {
    this.surveySubjectService.updateSurveySubjects(id, sub)
      .subscribe(e => {
        this.getSurveySubjects(sub.surveyInfo.surveyId);
        alert('Suver subject is updated');
      }, err => console.log(err), () => console.log('update complete'));
  }

  updateSurveyCount(id: string, cnt: number) {
    this.survey.subjects = this.survey.subjects + cnt;
    this.surveyService.updateSurvey(id, this.survey)
      .subscribe(e => {
        // this.getSurveySubjects(sub.surveyInfo.surveyId);
        console.log('Update survey count = ' + JSON.stringify(e));
      }, err => console.log(err), () => console.log('Update Survey Count'));
  }

  addSurveySubject() {
    console.log('Clicked add: ', this.surveyId$);
    const surveySubjectForm = this.surveySubjectService.surveySubjectForm();
    surveySubjectForm.patchValue({
      surveyInfo: {
        customerId: this.customerId,
        organizationId: this.organizationId,
        surveyId: this.surveyId$,
        wordBankId: this.wordBankId$,
        createDate: moment().toJSON(),
        notifiedCount: 0
      }
    });
    console.log('Patched form: ', surveySubjectForm.value);
    const dialogRef = this.dialog.open(SurveySubjectInfoComponent, {
      width: '700px',
      height: '500px',
      data: {
        form: surveySubjectForm,
        type: 'add'
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result && !result.pristine) {
          this.surveySubjectService.addSurveySubject(result.value)
            .subscribe((e: SurveySubject) => {
              this.updateSurveyCount(this.surveyId$, 1);
              this.getSurveySubjects(this.surveyId$);
              alert(`added: ${e.personalInfo.firstName}, ${e.personalInfo.lastName}`);

            }, err => console.log(err), () => console.log('complete add'));
        } else {
          console.log('aborted');
        }
      }, err => console.log(err), () => console.log('add complete'));
  }

  deleteSurveySubject(id: string) {
    this.surveySubjectService.deleteSurveySubject(id)
      .subscribe(e => {
        this.updateSurveyCount(this.surveyId$, -1);
        this.getSurveySubjects(this.surveyId$);
        alert('deleted');
      }, err => console.log(err), () => console.log('completed deleted'));
  }

  notifySurveySubject(surveySubject: SurveySubject) {
    console.log(surveySubject);
    // this.surveySubjectService.notifySurveySubject({ _id: surveySubject._id, email: surveySubject.personalInfo.email })
    this.surveySubjectService.notifySurveySubject(surveySubject)
      .pipe(
        take(1)
      ).subscribe(
        result => {
          console.log(result);
          surveySubject.surveyInfo.notifiedCount++;
          this.updateSurveySubject(surveySubject._id, surveySubject);
          alert(`Email has been sent to ` + surveySubject.personalInfo.email);
        },
        err => console.log(err),
        () => console.log('notified'));
  }

  constructor(
    public surveySubjectService: SurveySubjectService,
    public surveyService: SurveysService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.wordBankId.subscribe(e => {
      this.wordBankId$ = e;
    }, err => console.log(err), () => console.log('complete'));

    this.surveyId.subscribe(e => {
      this.surveyId$ = e;
      this.getSurveySubjects(e);
      this.getSurvey(e);
    }, err => console.log(err), () => console.log('survey id complete'));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.surveyId.complete();
  }
}
