import { Component, OnInit } from '@angular/core';
import { CustomerInterface } from '../../models/customer.interface';
import { CustomersService } from '../../services/customers.service';
import { CustomersDataSource } from '../../services/customers.datasource';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  dataSource: CustomersDataSource;
  displayedColumns = ['firstName', 'lastName', 'companyName', 'phone', 'email', '_id'];

  constructor(
    private customersService: CustomersService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() {
    this.dataSource = new CustomersDataSource(this.customersService);
    this.dataSource.loadCustomers();
  }

  onRowClicked(row: CustomerInterface) {
    const customerId = row ? row._id : null;
    // Pass along the hero id if available
    console.log('Row clicked: ', row);

    this.router.navigate(['/portal/customers/', customerId, {viewType: 'View'}]);
  }

  onDeleteClicked(row: CustomerInterface) {
    const customerId = row ? row._id : null;

    console.log('Row deleted clicked: ', row);
    // this.router.navigate(['/portal/customers']);
  }

  onCreateClicked() {
    // this.router.navigate(['./0', {viewType: 'Create'}], { relativeTo: this.route });
    this.router.navigate(['portal/customers/0', {viewType: 'Create'}]);
  }

}
