import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Organization } from '../../models/organization';
import { OrganizationsService } from '../../services/organizations.service';
import { OrganizationsDataSource } from '../../services/organizations.datasource';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {
  dataSource: OrganizationsDataSource;
  displayedColumns = ['name', 'poc', 'size', 'industry', 'state'];

  @Input() customerId: string;
  @Output() organizationInfo = new EventEmitter<any>();

  constructor (
    private organizationsService: OrganizationsService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() {
    this.dataSource = new OrganizationsDataSource(this.organizationsService);
    this.dataSource.loadOrganizations(this.customerId);
  }

  onRowClicked(row: Organization) {
    const organizationId: string = row ? row._id : null;
    // Pass along the organization id if available
    console.log('Organization Id: ' + organizationId);
    console.log('Row clicked: ', row);

    this.router.navigate(['/portal/organizations/', organizationId, {viewType: 'View', customerId: row.customerId}]);
  }
}
