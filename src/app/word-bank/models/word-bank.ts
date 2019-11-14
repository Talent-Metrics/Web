import {Word} from './word';

export interface WordBank {
  _id: string;
  name: string;
  description: string;
  words: Word[];
}
