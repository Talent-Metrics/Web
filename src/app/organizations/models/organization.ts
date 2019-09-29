export interface Organization {
  _id?: string;
  name: string;
  customerId: string;
  poc: string;
  size: number;
  industry: string;
  annualRevenue?: number;
  region?: number;
  state?: string;
}
