import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SurveysService} from '../../services/surveys.service';
import { SurveysDataSource} from '../../services/surveys.datasource';
import { Survey} from '../../models/survey';
import { Router} from '@angular/router';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})

export class SurveyListComponent implements OnInit {
  @Input() organizationId: string;
  @Output() organizationInfo = new EventEmitter<any>();

  constructor(
    private router: Router,
    private surveyService: SurveysService) { }

  surveys: Survey [];
  dataSource: SurveysDataSource;
  displayedColumns = ['name', 'subjects', 'completed'];

  getSurveys(): void {
    this.surveyService.getSurveysByOrganizationsId(this.organizationId)
        .pipe()
        .subscribe(surveys => this.surveys = surveys);
  }

  ngOnInit() {
    // this.getSurveys();
    this.dataSource = new SurveysDataSource(this.surveyService);
    this.dataSource.loadSurveys(this.organizationId);
  }

  onRowClicked(row: Survey) {
    const organizationId: string = row ? row._id : null;
    // Pass along the organization id if available
    console.log('Organization Id: ' + organizationId);
    console.log('Row clicked: ', row);

    this.router.navigate(['/portal/surveys/', organizationId, {viewType: 'View', customerId: row.customerId}]);
  }
}
