import { Component, OnInit, Input } from '@angular/core';
import { FormField } from '../../models/form-field';
import { Organization } from '../../models/organization';
import { KeyValue } from '../../models/key-value';
import { OrganizationReference } from '../../models/organization-reference';

@Component({
  selector: 'app-organization-view-input',
  templateUrl: './organization-view-input.component.html',
  styleUrls: ['./organization-view-input.component.scss']
})
export class OrganizationViewInputComponent implements OnInit {
  @Input() formField: FormField;
  @Input() organization: Organization;
  @Input() organizationReference: OrganizationReference;

  constructor() { }

  ngOnInit() {
  }

  getValue(field: string, isSelect: boolean, referenceField: string): string {
    if (!isSelect) {
      return Object.entries(this.organization).find((g) => g[0] === field)[1];
    } else {
        const orgKey = Object.entries(this.organization).find((g) => g[0] === field)[1];
        const refValue: KeyValue[] = Object.entries(this.organizationReference).find((g) => g[0] === referenceField)[1];

      return  refValue. find((g) => g.key === '' + orgKey).value;
    }

  }

}
