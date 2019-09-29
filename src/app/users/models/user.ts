export interface User {
  _id?: string;
  username: string;
  password: string;
  customerId: string;
  lockedOut: boolean;
  failedAttempts: number;
}
