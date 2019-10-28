export interface Survey {
  _id?: string;
  name: string;
  customerId: string;
  wordBankId: string;
  organizationId: string;
  subjects: number;
  completed: number;
}
