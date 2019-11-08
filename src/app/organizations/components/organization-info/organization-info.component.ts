import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Organization } from '../../models/organization';
import { FormField } from '../../models/form-field';
import { OrganizationReference } from '../../models/organization-reference';
import { KeyValue } from '../../models/key-value';

@Component({
  selector: 'app-organization-info',
  templateUrl: './organization-info.component.html',
  styleUrls: ['./organization-info.component.scss']
})
export class OrganizationInfoComponent implements OnInit, OnDestroy {
  @Input() parent: FormGroup;
  @Input() fields: any;
  @Input() formFields: FormField;
  @Input() organization: Organization;
  @Input() organizationReference: OrganizationReference;
  unsubscribe$ = new Subject<void>();
  constructor() { }

  ngOnInit() {
    // console.log(this.industries);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  compareFn(c1: string, c2: number): boolean {
    return c1 && c2 + '' ? c1 === c2 + '' : false;
}

}
