export interface Word {
  _id: string;
  name: string;
  definition: string;
  value: number;
  default: boolean;
  disabled: boolean;
  customerId: string;
  wordBankId: string;
  antonym: string;
}
