import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Organization} from '../../models/organization';
import { FormField} from '../../models/form-field';
import { OrganizationReference} from '../../models/organization-reference';
import { Survey } from '../../../surveys/models/survey';
import { SurveysService } from '../../../surveys/services/surveys.service';
import { OrganizationsService} from '../../services/organizations.service';
import { FormControl, FormGroup } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog} from '@angular/material';
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
  organizationReference: OrganizationReference;
  organizationForm = new FormGroup({});
  viewType: string;

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

  getSurveys(id: string) {
    this.surveyService.getSurveysByOrganizationsId(id)
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

  getOrganization(id: string) {
    console.log('Getting organization' + id);
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
 /*
  updateOrg() {
    this.organizationsService.updateOrganization(this.organization._id, this.organizationForm.value)
      .subscribe((e) => {
        alert(`${this.organizationForm.get('name').value} has been updated`);
        this.refreshForm();
        this.getOrganizations(this.customerId);
      }, err => {
        console.log(err);
        alert(err);
      }, () => { console.log('Update Organization complete'); });
    console.log(this.organizationForm.value);
  }*/
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
  addOrg() {
    console.log(this.organizationForm.value);
    this.organizationsService.addOrganization(this.organizationForm.value)
      .subscribe(e => {
          console.log(e);
          this.refreshForm();
          this.getOrganizations(this.customerId);
        },
        err => console.log(err),
        () => console.log('Add complete'));
  }
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

  onSubmit() {
  }

  onToggleDisplay() {
    this.viewDisplay = !this.viewDisplay;
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
    this.organization = undefined;
  }
  constructor(
    private organizationsService: OrganizationsService,
    private surveyService: SurveysService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.getOrganizations(this.customerId);
    this.organizationForm = this.organizationsService.organizationForm();
    // this.organizationForm.disable();

    this.viewDisplay = true;
    this.route.paramMap
    .subscribe((params: ParamMap) => {

      const id: string = params.get('id');
      console.log('Received organization id ' + id);
      this.viewType = params.get('viewType');
      console.log('Get view type ' + this.viewType);
      this.setupPanels(this.viewType);

      if (id) {
        console.log('Get organization by organizations id ');
        this.getOrganization(id);

        console.log('Get surveys by organizations id ');
        this.getSurveys(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
