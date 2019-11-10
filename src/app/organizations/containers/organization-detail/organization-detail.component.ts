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
import { OrganizationDialogComponent} from '../../components/organization-dialog/organization-dialog.component';

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
  // public dialog: MatDialog;

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

  /*
  getSurveys(id: string) {
    this.surveysService.getSurveysByOrganizationsId(id)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((surveys: Survey[]) => {
        this.surveys = surveys;
        console.log('Getting surveys count =' + surveys.length);
      }, err => {
        console.log(err);
        alert('The error =' + err);
      }, () => { console.log('Get Surveys complete'); });
  }
  */

  getOrganization(id: string) {
    console.log('Getting organization ' + id);
    // alert('Getting organization with id =' + id);
    this.organizationsService.getOrganizationById(id)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((org: Organization) => {
        this.organization = org;
      }, err => {
        console.log(err);
        alert('The error =' + err);
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
        alert('The error =' + err);
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

/*
  selectOrganization(position: number) {
    this.organization = this.organizations[position];
    this.organizationForm.patchValue(this.organization);
  }
*/
/*
  onUpdate() {
    this.organizationForm.enable();
    const dialogRef = this.dialog.open(OrganizationDialogComponent, {
      width: '700px',
      data: {
        parent: this.organizationForm,
        type: 'update'
      }
    });
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(result => {
        if (result) {
          this.organizationForm.patchValue(result);
          this.updateOrg();
        }
      this.organizationForm.disable();
    }, err => console.log(err), () => console.log('update complete'));
  }
 */
  updateOrg() {

    this.organizationForm.patchValue({
      customerId: this.organization.customerId,
      _id: this.organization._id
    });

    this.organizationsService.updateOrganization(this.organization._id, this.organizationForm.value)
    .subscribe((e) => {
      this.getOrganization(this.organization._id);
      alert(`${this.organizationForm.get('name').value} has been updated`);
      this.onToggleDisplay();
      // this.refreshForm();
    }, err => {
      console.log(err);
      alert(err);
    }, () => { console.log('Organization update complete'); });
    console.log(this.organizationForm.value);
  }
  /*
  onAdd() {
    this.organizationForm.enable();
    const dialogRef = this.dialog.open(OrganizationDialogComponent, {
      width: '700px',
      data: {
        parent: this.organizationForm,
        type: 'add'
      }
    });
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(result => {
        if (result) {
          this.organizationForm.patchValue(result);
          this.addOrg();
        }
        this.organizationForm.disable();
    }, err => console.log(err), () => console.log('add complete'));
  }
  */
  /*

  onDelete(id: string) {
    this.organizationsService.deleteOrganization(id)
      .pipe(
        take(1)
      )
      .subscribe(e => {
        alert(`Deleted ${id}`);
        this.refreshForm();
        this.getOrganizations(this.customerId);
      }, err => {
        alert(err);
        console.log(err);
      }, () => { console.log('Completed delete'); });
  }
  */
  addOrg() {
    this.organizationForm.patchValue({
      customerId: this.customerId,
    });

  console.log(JSON.stringify(this.organizationForm.value));
  this.organizationsService.addOrganization(this.organizationForm.value)
    .subscribe(e => {
        console.log(e);
        alert(`${this.organizationForm.get('name').value} has been added`);
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
  ) { }

  ngOnInit() {
    // this.getOrganizations(this.customerId);
    this.organizationForm = this.organizationsService.organizationForm();
    this.surveyForm = this.surveysService.surveyForm();
    // this.organizationForm.disable();

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
        // this.getSurveys(this.organization._id);
        this.surveyListComponent.loadSurveys();
        alert(`Created survey named: ${e.name}`);
        console.log(e);
      }, err => {
        alert(err);
        console.log(err);
      }, () => console.log('complete add'));
  }

}
