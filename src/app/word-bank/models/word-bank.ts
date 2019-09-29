import {Word} from './word';

export interface WordBank {
  _id: string;
  name: string;
  customerId: string;
  description: string;
  words: Word[];
}
