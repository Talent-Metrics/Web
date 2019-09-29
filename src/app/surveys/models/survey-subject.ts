import {Word} from '../../word-bank/models/word';

export interface SurveySubject {
  _id?: string;
  // customerId: string;
  // firstName: string;
  // lastName: string;
  // email: string;
  // organizationId: string;
  // positionTitle: string;
  // employeeClass: string;
  // age: number;
  // department: string;
  // division: string;
  // location: string;
  // yearsService: number;
  // gender: string;
  // ethnicity: string;
  // veteranStatus: boolean;
  // disabilityStatus: boolean;
  // educationLevel: number;
  // manager: string;
  // createDate: number;
  // completionDate: number;
  // completed: boolean;
  // notifiedCount: number;
  // surveyId: string;
  // wordBankId: string;
  // category1: string[];
  // category2: [];
  // category3: [];
  // category4: [];
  // category5: [];
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
    dob: number,
    department: string,
    division: string,
    location: string,
    hireDate: number,
    gender: string,
    ethnicity: string,
    veteranStatus: boolean,
    disabilityStatus: boolean,
    educationLevel: number,
    manager: string
  };
  categories: {
    category1: Word[],
    category2: Word[],
    category3: Word[],
    category4: Word[],
    category5: Word[]
  };
}
