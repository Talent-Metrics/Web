import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Survey } from '../models/survey';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SurveysService {
  private configUrl = environment.apiUrl + '/surveys';

  formFields = [
    { key: 'wordBankId', value: 'Word Bank', type: 'text' },
    { key: 'name', value: 'Name', type: 'text' },
    { key: 'customerId', value: 'Customer Id', type: 'text' },
    { key: 'organizationId', value: 'Organization Id', type: 'text' },
    { key: 'subjects', value: 'Subjects', type: 'number' },
    { key: 'completed', value: 'Completed', type: 'number' }
    ];

  surveyForm() {
    const formObj = {};
    this.formFields.forEach(e => {
      if (e.type === 'text') {
        formObj[e.key] = new FormControl('');
      } else if (e.type === 'number' || e.type === 'date') {
        formObj[e.key] = new FormControl(0);
      } else if (e.type === 'array') {
        formObj[e.key] = new FormArray([]);
      }
    });
    return new FormGroup(formObj);
  }
  getSurveyById(id: string) {
    return this.http.get(this.configUrl + '/id/' + id);
  }

  getSurveysByCustomerId(customerId: string) {
    return this.http.get(this.configUrl + '/customer/' + customerId);
  }

  getSurveysByOrganizationsId(organizationId: string) {
    return this.http.get<Survey[]>(this.configUrl + '/organization/' + organizationId);
  }

  updateSurvey(id: string, survey: Survey) {
    return this.http.put(this.configUrl + '/' + id, survey);
  }

  addSurvey(survey: Survey) {
    return this.http.post(this.configUrl, survey);
  }

  deleteSurvey(surveyId: string) {
    return this.http.delete(this.configUrl + '/' + surveyId);
  }
  constructor(
    private http: HttpClient
  ) { }
}
