import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Survey } from '../models/survey';
import { FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {
  private configUrl = environment.apiUrl + '/surveys';


 surveyForm() {
    const formFields = {
      customerId: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      wordBankId: new FormControl('', [Validators.required]),
      organizationId: new FormControl(''),
      subjects: new FormControl(0),
      completed: new FormControl(0),
    };
    return new FormGroup(formFields);
  }

  getSurveyById(id: string): Observable<Survey> {
    return this.http.get<Survey>(this.configUrl + '/id/' + id);
  }

  getSurveysByCustomerId(customerId: string): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.configUrl + '/customer/' + customerId);
  }

  getSurveysByOrganizationsId(organizationId: string): Observable<Survey[]> {
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
