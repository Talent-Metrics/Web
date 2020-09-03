import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { OrganizationsService } from '../../../organizations/services/organizations.service';
import { CustomerInterface } from '../../models/customer.interface';
import { Organization } from '../../../organizations/models/organization';
import { FormControl, FormGroup } from '@angular/forms';
import { take, takeUntil, skip} from 'rxjs/operators';
import { Subject} from 'rxjs';
import * as moment from 'moment';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private customer$ = new Subject<CustomerInterface>();

  customer: CustomerInterface;
  organizations: Organization[];
  customerForm: FormGroup;
  customerViewForm: FormGroup;
  viewType: string;
  viewDisplay: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  getCustomer(id: string) {
    this.customersService.getCustomerById(id)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data: CustomerInterface) => {
        this.setCustomerInterface(data);
      },
      err => {
        console.log(err);
        this._snackBar.open(`Error, please check log`, 'Clear', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      },
      () => { console.log('Get Customer complete'); });
  }

  getOrganizations(id: string) {
    console.log('Getting organization ' + id);
    this.organizationsService.getOrganizationsByCustomerId(id)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        (orgs: Organization[]) => {
        this.organizations = orgs;
        },
        err => {
          console.log(err);
          this._snackBar.open(`Error, please check log`, 'Clear', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
        },
        () => { console.log('Get Organizations complete'); }
      );
  }

  update() {
    console.log('Attempting to update a customer = ' + this.customerForm.value);
    const form = this.customerForm.value;
    form.updateDate = moment().toJSON();
    this.customersService.updateCustomer(this.customer._id, form)
      .subscribe((e) => {
        console.log(e);
        this.getCustomer(this.customer._id);
        this._snackBar.open(`Your customer record has been successfully updated.`, 'Clear', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        this.customerForm.markAsPristine();
        this.onToggleDisplay();
      },
      err => {
        console.log(err);
        this._snackBar.open(`Error, please check log`, 'Clear', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      },
      () => { console.log('Update Customer complete'); });
  }

  setCustomerInterface(c: CustomerInterface) {
    this.customer = c;
    this.customerForm.patchValue(this.customer);
    this.customerViewForm.patchValue(this.customer);
  }

  add() {
    console.log('Attempting to add a new customer ' + JSON.stringify(this.customerForm.value));
    const form = this.customerForm.value;
    form.creationDate = moment().toJSON();
    this.customersService.addCustomer(form)
    .subscribe((e) => {
      console.log(' Addition return =' + JSON.stringify(e));
      this.customerForm.markAsPristine();
      this._snackBar.open(`Your customer record has been successfully added.`, 'Clear', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
      this.router.navigate(['/portal/customers/']);
    },
    err => {
      console.log(err);
      this._snackBar.open(`Error, please check log`, 'Clear', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
    },
    () => { console.log('Add Customer complete'); });
  }

  onSubmit() {
    if (this.customer) {
      this.update();
    } else {
      this.add();
    }
  }

  onDelete() {
    console.log('Attempting to delete customer =' + this.customer._id);
  }

  refreshForm() {
    this.customerForm.reset(this.customer);
    console.log('Refresh form');
  }

  setupPanels(view: string) {
    if ((this.viewType === 'View' || this.viewType === 'Edit') && this.customer) {
      // route to page not found. View and Edit must have customer
    }

    if (this.viewType === 'View') {
      this.viewDisplay = true;
    } else {
      this.viewDisplay = false;
    }
  }

  createOrganization() {
    this.router.navigate(['/portal/organizations/0', {viewType: 'Create', customerId: this.customer._id}]);
  }


  onToggleDisplay() {
    if (this.customer) {
      this.viewDisplay = !this.viewDisplay;
    } else {
      this.router.navigate(['/portal/customers/']);
    }
  }

  testEmit(evt) {
    console.log(evt);
  }

  constructor
  (
    private customersService: CustomersService,
    private organizationsService: OrganizationsService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.viewDisplay = true;
    this.route.paramMap
    .subscribe((params: ParamMap) => {
      const id: string = params.get('id');
      console.log('Received customer id ' + id);
      this.viewType = params.get('viewType');
      console.log('Get view type ' + this.viewType);
      this.setupPanels(this.viewType);
      if (id !== '0' ) {
        this.getCustomer(id);
        console.log('Get organizations for customer id ' + id);
        this.getOrganizations(id);
      }
    });

    this.customerForm = this.customersService.customerForm();
    this.customerViewForm  = this.customersService.customerForm();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
