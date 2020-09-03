import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Organization} from '../../models/organization';
import { FormField} from '../../models/form-field';
import { OrganizationReference} from '../../models/organization-reference';
import { Survey } from '../../../surveys/models/survey';
import { WordBank } from '../../../word-bank/models/word-bank';
import { SurveysService } from '../../../surveys/services/surveys.service';
import { OrganizationsService} from '../../services/organizations.service';
import { WordBankService} from '../../../word-bank/services/word-bank.service';
import { FormControl, FormGroup } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog} from '@angular/material';
import { SurveyDialogComponent} from '../../../surveys/components/survey-dialog/survey-dialog.component';
import { SurveyListComponent} from '../../../surveys/components/survey-list/survey-list.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss']
})
export class OrganizationDetailComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  surveys: Survey[];
  organization: Organization;
  customerId: string;
  organizationReference: OrganizationReference;
  organizationForm = new FormGroup({});
  viewType: string;
  surveyForm = new FormGroup({});
  wordBanks: WordBank[];
  @ViewChild(SurveyListComponent, {static: false})
  private surveyListComponent: SurveyListComponent;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  formFields: FormField[] = [
    { key: 'name', value: 'Organization Name', type: 'text', isSelect: false, referenceField: '' },
    { key: 'poc', value: 'Point of Contact', type: 'text', isSelect: false, referenceField: ''},
    { key: 'size', value: 'Organization Size', type: 'number', isSelect: true, referenceField: 'orgSizes' },
    { key: 'industry', value: 'Industry', type: 'text', isSelect: false , referenceField: ''},
    { key: 'annualRevenue', value: 'Annual Revenue', type: 'number', isSelect: true , referenceField: 'revenues'},
    { key: 'region', value: 'Region', type: 'text', isSelect: true , referenceField: 'regions'},
    { key: 'state', value: 'State', type: 'text', isSelect: true , referenceField: 'states'},
  ];

  viewDisplay: boolean;

  getOrganization(id: string) {
    console.log('Getting organization ' + id);
    this.organizationsService.getOrganizationById(id)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((org: Organization) => {
        this.organization = org;
      }, err => {
        console.log(err);
        this._snackBar.open(`Error, please check log`, 'Clear', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      }, () => { console.log('Get Organization complete'); });
  }

  getOrganizationReference() {
    console.log('Getting organization reference');
    this.organizationsService.getOrganizationReference()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((orgRef: OrganizationReference[]) => {
        this.organizationReference = orgRef[0];
      }, err => {
        console.log(err);
        this._snackBar.open(`Error, please check log`, 'Clear', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      }, () => { console.log('Get Organization complete'); });
  }

  getWordBanks() {
    console.log('Getting word bank');
    this.wordBankService.getAll()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe((e: WordBank[]) => {
        this.wordBanks = e;
    }, err => console.log(err), () => console.log('got word banks'));
  }

  updateOrg() {

    this.organizationForm.patchValue({
      customerId: this.organization.customerId,
      _id: this.organization._id
    });

    this.organizationsService.updateOrganization(this.organization._id, this.organizationForm.value)
    .subscribe((e) => {
      this.getOrganization(this.organization._id);
      this._snackBar.open(`${this.organizationForm.get('name').value} has been updated`, 'Clear', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
      this.onToggleDisplay();
    }, err => {
      console.log(err);
      this._snackBar.open(`Error, please check log`, 'Clear', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
    }, () => { console.log('Organization update complete'); });
    console.log(this.organizationForm.value);
  }
  addOrg() {
    this.organizationForm.patchValue({
      customerId: this.customerId,
    });

  console.log(JSON.stringify(this.organizationForm.value));
  this.organizationsService.addOrganization(this.organizationForm.value)
    .subscribe(e => {
        console.log(e);
        this._snackBar.open(`${this.organizationForm.get('name').value} has been added`, 'Clear', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        this.onToggleDisplay();
        // this.refreshForm();
        // this.getOrganizations(this.customerId);
      },
      err => console.log(err),
      () => console.log('Organization add complete'));
  }

  onSubmit() {
  }

  constructor(
    private organizationsService: OrganizationsService,
    private surveysService: SurveysService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private wordBankService: WordBankService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.organizationForm = this.organizationsService.organizationForm();
    this.surveyForm = this.surveysService.surveyForm();

    this.viewDisplay = true;
    this.route.paramMap
    .subscribe((params: ParamMap) => {

      const id: string = params.get('id');
      console.log('Received organization id ' + id);

      this.viewType = params.get('viewType');
      console.log('Get view type ' + this.viewType);

      this.setupPanels(this.viewType);
      this.customerId = params.get('customerId');

      this.getOrganizationReference();
      console.log('Get word banks by customer id = ' + this.customerId );
      this.getWordBanks();

      if (id !== '0') {
        console.log('Get organization by organizations id ');
        this.getOrganization(id);

        // console.log('Get surveys by organizations id ');
        // this.getSurveys(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onToggleDisplay(): void {
    if (this.organization) {
      this.organizationForm.reset();
      this.organizationForm.patchValue(this.organization);
      this.viewDisplay = !this.viewDisplay;
    } else {
      this.router.navigate(['/portal/customers/' + this.customerId, {viewType: 'View'}]);
    }
  }

  setupPanels(view: string) {
    if ((this.viewType === 'View' || this.viewType === 'Edit') && this.organization) {
      // route to page not found. View and Edit must have customer
    }

    if (this.viewType === 'View') {
      this.viewDisplay = true;
    } else {
      this.viewDisplay = false;
    }
  }

  refreshForm() {
    this.organizationForm.reset();
    this.organizationForm.patchValue(this.organization);
    // this.organization = undefined;
  }

  resetSurveyForm() {
    // this.survey = undefined;
    // this.surveyId.next('');
    this.surveyForm.reset();
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
      customerId: this.organization.customerId,
      organizationId: this.organization._id,
      subjects: 0,
      completed: 0
    });
    this.surveysService.addSurvey(this.surveyForm.value)
      .subscribe((e: Survey) => {
        this.resetSurveyForm();
        this.surveyListComponent.loadSurveys();
        this._snackBar.open(`Created survey named: ${e.name}`, 'Clear', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        console.log(e);
      }, err => {
        this._snackBar.open(`Error, please check log`, 'Clear', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        console.log(err);
      }, () => console.log('complete add'));
  }

}
