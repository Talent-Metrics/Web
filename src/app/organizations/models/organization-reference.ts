import {KeyValue} from './key-value';
export interface OrganizationReference {
  _id?: string;
  industries: string[];
  orgSizes: KeyValue[];
  regions: KeyValue[];
  revenues: KeyValue[];
  states: KeyValue[];
}
