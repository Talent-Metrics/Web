import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SurveySubject } from '../../models/survey-subject';
import { Survey } from '../../models/survey';
import { SurveySubjectService } from '../../services/survey-subject.service';
import { SurveysService } from '../../services/surveys.service';
import { Observable, Subject, forkJoin, of} from 'rxjs';
import { take, takeUntil, catchError} from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { SurveySubjectInfoComponent } from '../../components/survey-subject-info/survey-subject-info.component';
import { SurveyUploadComponent } from '../../components/survey-upload/survey-upload.component';
import { SurveyConfirmationComponent} from '../../components/survey-confirmation/survey-confirmation.component';
import * as moment from 'moment';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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
  unsubscribe$ = new Subject<void>();
  surveyId$: string;
  wordBankId$: string;
  surveySubjects: SurveySubject[];
  survey: Survey;
  type: string;
  totalSubjects: number;
  closedSubjects: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  getSurveySubjects(surveyId: string) {
    this.surveySubjectService.getSurveySubjectsBySurvey(surveyId)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((e: SurveySubject[]) => {
        this.surveySubjects = e;
        this.totalSubjects = e.length;
        this.closedSubjects = e.filter(k => k.surveyInfo.completed === true).length;
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
      err => console.log(err), () => console.log('complete survey pull')
      );
  }

  refreshSurveyCounts() {
    this.surveySubjectService.getSurveySubjectsBySurvey(this.surveyId$)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((e: SurveySubject[]) => {
        this.surveySubjects = e;
        let surveyCompleted = 0;
        for (const subjectSubject of this.surveySubjects) {
          if (subjectSubject.surveyInfo.completed) {
            surveyCompleted++;
          }
        }
        this.survey.completed = surveyCompleted;
        this.survey.subjects = e.length;
        this.surveyService.updateSurvey(this.surveyId$, this.survey)
        .subscribe(s => {
          this.getSurvey(this.surveyId$);
          console.log('Update survey count and completed = ' + JSON.stringify(s));
        }, err => console.log(err),
        () => console.log('Update Survey Count'));
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
          createDate: moment().toJSON()
        },
        surveySubjects: this.surveySubjects
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          if (result.inserted > 0 || result.updated > 0 ) {
            this.getSurveySubjects(this.surveyId$);
              // trigger an update survey
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
          this.refreshSurveyCounts();
        } else {
          console.log('No changes');
        }
      });
  }

  updateSurveySubject(id: string, sub: SurveySubject, notify: boolean = true) {
    this.surveySubjectService.updateSurveySubjects(id, sub)
      .subscribe(e => {
        this.getSurveySubjects(sub.surveyInfo.surveyId);
        if (notify) {
          this._snackBar.open('Survey subject is updated', 'Clear', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
        }
      }, err => console.log(err), () => console.log('update complete'));
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
              this.getSurveySubjects(this.surveyId$);
              this.refreshSurveyCounts();
              this._snackBar.open(`Survey subject is added: ${e.personalInfo.firstName}  ${e.personalInfo.lastName}`, 'Clear', {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition
              });

            }, err => console.log(err), () => console.log('complete add'));
        } else {
          console.log('aborted');
        }
      }, err => console.log(err), () => console.log('add complete'));
  }

  deleteSurveySubject(id: string) {
      this.surveySubjectService.deleteSurveySubject(id)
      .subscribe(e => {
        this.getSurveySubjects(this.surveyId$);
        this.refreshSurveyCounts();
        this._snackBar.open(`Survey subject is deleted`, 'Clear', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      },
      err => console.log(err),
      () => console.log('SurveySubject ' + id + ' deleted'));
  }

  notifySurveySubject(surveySubject: SurveySubject, notify: boolean = true) {
    console.log(surveySubject);
    this.surveySubjectService.notifySurveySubject(surveySubject)
      .pipe(
        take(1)
      ).subscribe(
        result => {
          console.log(result);
          if (result['accepted'] && result['accepted'].length > 0 ) {
            surveySubject.surveyInfo.notifiedCount++;
            this.updateSurveySubject(surveySubject._id, surveySubject, false);
            if (notify) {
              this._snackBar.open(`Email has been successfully sent to ${surveySubject.personalInfo.email}`, 'Clear', {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition
              });
            }
          } else {
            if (notify) {
              this._snackBar.open(`Email attempted to ${surveySubject.personalInfo.email} was not successfully sent`, 'Clear', {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition
              });
            }
          }
        },
        err => console.log(err),
        () => console.log('email sent and notified updated')
      );
  }

  notifyAllSurveySubjects( notify: boolean = true) {
    console.log('Notify all uncompleted Survey Subjects = ' + this.surveySubjects.length);
    const requests: Observable<Object>[] = [];

    this.surveySubjects.forEach((value, index, arr) => {
      if ( !value.surveyInfo.completed) {
        requests.push(this.surveySubjectService.notifySurveySubject(value)
        );
      }
    });
    const allMail = forkJoin(requests).pipe(catchError(error => of(error)));

    const subscribe = allMail.subscribe(val => {
      console.log(val);
      let successfulEmails = 0;
      let unsuccessfulEmails = 0;
      if (val.length > 0 ) {
        val.forEach((result, index, arr) => {
        if (result['accepted'] && result['accepted'].length > 0 ) {
          successfulEmails++;
          const surveySubject = this.surveySubjects.find((j) => j.personalInfo.email === result['accepted'][0] );
          surveySubject.surveyInfo.notifiedCount++;
          this.updateSurveySubject(surveySubject._id, surveySubject, false);
        } else {
          unsuccessfulEmails++;
        }

        });
        if (notify) {
          this._snackBar.open(
            `Emails have successfully been sent to ${successfulEmails} participants. ` +
            `There were ${unsuccessfulEmails} attempted.`, 'Clear', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
        }
      }

    }
    , err => console.log(err), () => console.log('allMail complete'));
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
    public surveySubjectService: SurveySubjectService,
    public surveyService: SurveysService,
    public dialog: MatDialog
    ,private _snackBar: MatSnackBar
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
    this.wordBankId.complete();
  }
}
