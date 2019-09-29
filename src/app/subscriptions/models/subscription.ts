export interface Subscription {
  _id?: string;
  subscriptionName: string;
  subscriptionType: number;
  customerId: string;
  startDate: number;
  endDate: number;
  surveyCount: number;
  maxSurveys: number;
  autoRenew: number;
}
