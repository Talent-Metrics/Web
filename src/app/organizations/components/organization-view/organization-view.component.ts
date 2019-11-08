import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Organization } from '../../models/organization';
import { FormField } from '../../models/form-field';
import { OrganizationReference } from '../../models/organization-reference';

@Component({
  selector: 'app-organization-view',
  templateUrl: './organization-view.component.html',
  styleUrls: ['./organization-view.component.scss']
})
export class OrganizationViewComponent implements OnInit {
  @Input() organization: Organization;
  @Input() organizationReference: OrganizationReference;
  @Input() formFields: FormField[];
  @Output() organizationInfo = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  getValue(field): string {
    return Object.entries(this.organization).find((g) => g[0] === field)[1];
  }
}
