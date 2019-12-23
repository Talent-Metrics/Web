import {Word} from '../../word-bank/models/word';

export interface SurveySubject {
  _id?: string;
  surveyInfo: {
    completed: boolean,
    completionDate: number,
    createDate: number,
    customerId: string,
    notifiedCount: number,
    organizationId: string,
    surveyId: string,
    wordBankId: string
  };
  personalInfo: {
    firstName: string,
    lastName: string,
    email: string,
    positionTitle: string,
    employeeClass: string,
    // dob: Date,
    age: number,
    department: string,
    division: string,
    location: string,
    hireDate: Date,
    gender: string,
    ethnicity: string,
    veteranStatus: boolean,
    disabilityStatus: boolean,
    educationLevel: number,
    manager: string,
    managerEmail: string
  };
  categories: {
    category1: Word[],
    category2: Word[],
    category3: Word[],
    category4: Word[],
    category5: Word[],
    category6: Word[],
    category7: Word[],
  };
}
