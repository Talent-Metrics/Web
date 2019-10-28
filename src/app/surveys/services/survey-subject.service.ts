import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SurveySubject } from '../models/survey-subject';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { environment } from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SurveySubjectService {
  private configUrl = environment.apiUrl + '/surveysubjects';
  private mailUrl = environment.apiUrl + '/mail';
  dataSource = new BehaviorSubject(undefined);
  data = this.dataSource.asObservable();
  get survey() {
    console.log('getting survey');
    return this.dataSource.getValue();
  }
  surveySubjectForm(a?: any) {
    if (a) {
      return new FormGroup({
        _id: new FormControl(a._id),
        personalInfo: new FormGroup({
          firstName: new FormControl(a.personalInfo.firstName, [
            Validators.required
          ]),
          lastName: new FormControl(a.personalInfo.lastName, [
            Validators.required
          ]),
          email: new FormControl(a.personalInfo.email, [
            Validators.required
          ]),
          positionTitle: new FormControl(a.personalInfo.positionTitle),
          employeeClass: new FormControl(a.personalInfo.employeeClass),
          dob: new FormControl(a.personalInfo.dob),
          department: new FormControl(a.personalInfo.department),
          division: new FormControl(a.personalInfo.division),
          location: new FormControl(a.personalInfo.location),
          hireDate: new FormControl(a.personalInfo.hireDate),
          gender: new FormControl(a.personalInfo.gender),
          ethnicity: new FormControl(a.personalInfo.ethnicity),
          veteranStatus: new FormControl(a.personalInfo.veteranStatus),
          disabilityStatus: new FormControl(a.personalInfo.disabilityStatus),
          educationLevel: new FormControl(a.personalInfo.educationLevel),
          manager: new FormControl(a.personalInfo.manager)
        }),
        surveyInfo: new FormGroup({
          customerId: new FormControl(a.surveyInfo.customerId, [
            Validators.required
          ]),
          organizationId: new FormControl(a.surveyInfo.organizationId, [
            Validators.required
          ]),
          createDate: new FormControl(a.surveyInfo.createDate, [
            Validators.required
          ]),
          completionDate: new FormControl(a.surveyInfo.completionDate),
          completed: new FormControl(a.surveyInfo.completed),
          notifiedCount: new FormControl(a.surveyInfo.notifiedCount),
          surveyId: new FormControl(a.surveyInfo.surveyId, [
            Validators.required
          ]),
          wordBankId: new FormControl(a.surveyInfo.wordBankId, [
            Validators.required
          ])
        }),
        categories: new FormGroup({
          category1: new FormControl(a.categories.category1, [
            Validators.required
          ]),
          category2: new FormControl(a.categories.category2, [
            Validators.required
          ]),
          category3: new FormControl(a.categories.category3, [
            Validators.required
          ]),
          category4: new FormControl(a.categories.category4, [
            Validators.required
          ]),
          category5: new FormControl(a.categories.category5, [
            Validators.required
          ])
        })
      });
    } else {
      return new FormGroup({
        _id: new FormControl(null),
        personalInfo: new FormGroup({
          firstName: new FormControl('', [
            Validators.required
          ]),
          lastName: new FormControl('', [
            Validators.required
          ]),
          email: new FormControl('', [
            Validators.required
          ]),
          positionTitle: new FormControl(''),
          employeeClass: new FormControl(''),
          dob: new FormControl(0),
          department: new FormControl(''),
          division: new FormControl(''),
          location: new FormControl(''),
          hireDate: new FormControl(0),
          gender: new FormControl(''),
          ethnicity: new FormControl(''),
          veteranStatus: new FormControl(false),
          disabilityStatus: new FormControl(false),
          educationLevel: new FormControl(0),
          manager: new FormControl('Update')
        }),
        surveyInfo: new FormGroup({
          customerId: new FormControl('', [
            Validators.required
          ]),
          organizationId: new FormControl('', [
            Validators.required
          ]),
          createDate: new FormControl(0, [
            Validators.required
          ]),
          completionDate: new FormControl(0),
          completed: new FormControl(false),
          notifiedCount: new FormControl(0),
          surveyId: new FormControl('', [
            Validators.required
          ]),
          wordBankId: new FormControl('', [
            Validators.required
          ])
        }),
        categories: new FormGroup({
          category1: new FormControl([], [
            Validators.maxLength(3),
            Validators.required
          ]),
          category2: new FormControl([], [
            Validators.maxLength(6),
            Validators.required
          ]),
          category3: new FormControl([], [
            Validators.maxLength(8),
            Validators.required
          ]),
          category4: new FormControl([], [
            Validators.maxLength(6),
            Validators.required
          ]),
          category5: new FormControl([], [
            Validators.maxLength(3),
            Validators.required
          ])
        })
      });
    }
  }
  getSurveySubjectsByCustomer(id: string) {
    return this.http.get(this.configUrl + '/customer/' + id);
  }

  getSurveySubjectsByOrganization(id: string) {
    return this.http.get(this.configUrl + '/organization/' + id);
  }

  getSurveySubjectById(id: string) {
    return this.http.get(this.configUrl + '/id/' + id);
  }

  getSurveySubjectsBySurvey(surveyId: string) {
    console.log(this.configUrl, '/survey/', surveyId);
    return this.http.get(this.configUrl + '/survey/' + surveyId);
  }

  updateSurveySubjects(id: string, surveySubject: SurveySubject) {
    return this.http.put(this.configUrl + '/' + id, surveySubject);
  }

  addSurveySubject(surveySubject: SurveySubject) {
    return this.http.post(this.configUrl, surveySubject);
  }

  deleteSurveySubject(id: string) {
    return this.http.delete(this.configUrl + '/id/' + id);
  }

  deleteSurveySubjectBySurvey(surveyId: string) {
    return this.http.delete(this.configUrl + '/survey/' + surveyId);
  }

  notifySurveySubject(abc) {
    return this.http.post(this.mailUrl, abc);
  }
  constructor(
    private http: HttpClient
  ) { }
}
