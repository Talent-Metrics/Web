export class CustomerInterface {
  _id?: string;
  address: {
    number: string,
    street: string,
    city: string,
    state: string,
    zip: string,
    country: string
  };
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  countryCode: string;
  subscribed: boolean;
  subscriptionId: string;
  lifetimeValue: number;
  creationDate: number;
  closedDate: number;
  taxId: number;
  hris: string;
}
