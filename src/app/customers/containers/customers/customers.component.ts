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

@Component({
  selector: 'customers',
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

  getCustomer(id: string) {
    this.customersService.getCustomerById(id)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data: CustomerInterface) => {
        this.customer = data;
        this.customerForm.patchValue(this.customer);
        this.customerViewForm.patchValue(this.customer);
      },
      err => {
        console.log(err);
        // alert(err);
        // add messages architecture
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
          // alert('The error ='+err);
          // add messages architecture
        },
        () => { console.log('Get Organizations complete'); }
      );
  }

  update() {
    console.log('Updating customer = ' + this.customerForm.value);
    const form = this.customerForm.value;
    form.updateDate = moment().toJSON();
    this.customersService.updateCustomer(this.customer._id, form)
      .subscribe((e) => {
        alert(`Your customer record has been successfully updated.`);
        console.log(e);
        this.customerForm.markAsPristine();
        this.getCustomer(this.customer._id);
      },
      err => {
        console.log(err);
        alert(err);
      },
      () => { console.log('Update Customer complete'); });
  }

  add() {
    console.log('Add a new customer' + this.customerForm.value);
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

  onToggleDisplay() {
    this.viewDisplay = !this.viewDisplay;
  }

  testEmit(evt) {
    console.log(evt);
  }

  constructor
  (
    private customersService: CustomersService,
    private organizationsService: OrganizationsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.viewDisplay = true;
    this.route.paramMap
    .subscribe((params: ParamMap) => {
      const id: string = params.get('id');
      console.log('Received customer id ' + id);
      this.viewType = params.get('viewType');
      console.log('Get view type ' + this.viewType);
      this.setupPanels(this.viewType);
      if (id) {
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
