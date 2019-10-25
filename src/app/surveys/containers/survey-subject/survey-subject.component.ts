import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SurveySubject } from '../../models/survey-subject';
import { SurveySubjectService } from '../../services/survey-subject.service';
import {Observable, Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { SurveySubjectInfoComponent } from '../../components/survey-subject-info/survey-subject-info.component';

@Component({
  selector: 'survey-subject',
  templateUrl: './survey-subject.component.html',
  styleUrls: ['./survey-subject.component.scss']
})
export class SurveySubjectComponent implements OnInit, OnDestroy {
  @Input()
    surveyId: Subject<string>;
  @Input()
    wordBankId: Subject<string>;
  surveyId$: string;
  wordBankId$: string;
  unsubscribe$ = new Subject<void>();
  surveySubjects: SurveySubject[];
  customerId: string;
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

  viewSurveySubject(a: SurveySubject) {
    const surveySubjectForm = this.surveySubjectService.surveySubjectForm(a);
    const dialogRef = this.dialog.open(SurveySubjectInfoComponent, {
      width: '700px',
      height: '500px',
      data: {
        form: surveySubjectForm
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
        alert('Record updated');
        // this.getSurveySubjects(this.surveyId);
      }, err => console.log(err), () => console.log('update complete'));
  }

  addSurveySubject() {
    console.log('Clicked add: ', this.surveyId$);
    const surveySubjectForm = this.surveySubjectService.surveySubjectForm();
    surveySubjectForm.patchValue({
      surveyInfo: {
        customerId: this.customerId,
        surveyId: this.surveyId$,
        wordBankId: this.wordBankId$
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
              alert(`added: ${e.personalInfo.firstName}, ${e.personalInfo.lastName}`);
              this.getSurveySubjects(this.surveyId$);
            }, err => console.log(err), () => console.log('complete add'));
        } else {
          console.log('aborted');
        }
      }, err => console.log(err), () => console.log('add complete'));
  }

  deleteSurveySubject(id: string) {
    this.surveySubjectService.deleteSurveySubject(id)
      .subscribe(e => {
        alert('deleted');
        this.getSurveySubjects(this.surveyId$);
      }, err => console.log(err), () => console.log('completed deleted'));
  }
  notifySurveySubject(surveySubject: SurveySubject) {
    console.log(surveySubject);
    // this.surveySubjectService.notifySurveySubject({ _id: surveySubject._id, email: surveySubject.personalInfo.email })
    this.surveySubjectService.notifySurveySubject(surveySubject)
      .pipe(
        take(1)
      ).subscribe(result => console.log(result), err => console.log(err), () => console.log('notified'));
  }
  constructor(
    public surveySubjectService: SurveySubjectService,
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    this.wordBankId.subscribe(e => {
      this.wordBankId$ = e;
    }, err => console.log(err), () => console.log('complete'));
    this.surveyId.subscribe(e => {
      this.surveyId$ = e;
      this.getSurveySubjects(e);
    }, err => console.log(err), () => console.log('survey id complete'));

    this.customerId = '5c429b0a1c9d4400005b4830';
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.surveyId.complete();
  }
}
