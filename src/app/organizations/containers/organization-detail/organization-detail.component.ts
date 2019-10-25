import { Component, OnInit, OnDestroy } from '@angular/core';
import { Organization} from '../../models/organization';
import { OrganizationsService } from '../../services/organizations.service';
import { FormControl, FormGroup } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog} from '@angular/material';
import { OrganizationDialogComponent} from '../../components/organization-dialog/organization-dialog.component';

@Component({
  selector: 'organization-details',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss']
})
export class OrganizationDetailComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  customerId: string = '5c429b0a1c9d4400005b4830';
  organizations: Organization[];
  organization: Organization;
  organizationForm = new FormGroup({});
  formFields = [
    { key: 'name', value: 'Organization Name', type: 'text' },
    { key: 'poc', value: 'Point of Contact', type: 'text' },
    { key: 'size', value: 'Organization Size', type: 'number' },
    { key: 'industry', value: 'Industry', type: 'text' },
    { key: 'annualRevenue', value: 'Annual Revenue', type: 'number' },
    { key: 'region', value: 'Region', type: 'text' },
    { key: 'state', value: 'State', type: 'text' },
  ];
  getOrganizations(id) {
    console.log('Getting organization' + id);
    alert('Getting organization with id =' + id);
    this.organizationsService.getOrganizationsByCustomerId(id)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((orgs: Organization[]) => {
        this.organizations = orgs;
      }, err => {
        console.log(err);
        alert('The error ='+err);
      }, () => { console.log('Get Organizations complete'); });
  }
  selectOrganization(position: number) {
    this.organization = this.organizations[position];
    this.organizationForm.patchValue(this.organization);
  }
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
  }
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

  onSubmit() {
  }
  refreshForm() {
    this.organizationForm.reset();
    this.organizationForm.patchValue({'customerId': this.customerId} );
    this.organization = undefined;
  }
  constructor(
    private organizationsService: OrganizationsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getOrganizations(this.customerId);
    this.organizationForm = this.organizationsService.organizationForm(this.customerId);
    this.organizationForm.disable();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
