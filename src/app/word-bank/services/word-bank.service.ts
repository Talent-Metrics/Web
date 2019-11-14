import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordBank } from '../models/word-bank';
import { FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { Word } from '../models/word';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WordBankService {
  configUrl: string = environment.apiUrl + '/wordbanks';
  mwKey = '464c1cde-220b-44a9-a1f2-23e2cfa8235b';
  getWordForm(word?: Word) {
    if (word) {
      return new FormGroup({
        name: new FormControl(word.name),
        definition: new FormControl(word.definition),
        value: new FormControl(word.value),
        default: new FormControl(word.default),
        disabled: new FormControl(word.disabled),
        antonym: new FormControl(word.antonym)
      });
    } else {
      return new FormGroup({
        name: new FormControl(''),
        definition: new FormControl(''),
        value: new FormControl(null),
        default: new FormControl(false),
        disabled: new FormControl(false),
        antonym: new FormControl('')
      });
    }
  }

  getBankWordForm() {
    return new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl(''),
      words: new FormArray([])
    });
  }

  getAll() {
    return this.http.get(this.configUrl);
  }
  getOne(id: string) {
    return this.http.get(this.configUrl + '/id/' + id);
  }
  getDefault() {
    return this.http.get(this.configUrl + '/default');
  }

  getWordDefinition(word: string) {
    return this.http.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/
      ${ word }
      ?key=${ this.mwKey }`);
  }

  updateOne(id: string, wordbank: WordBank) {
    return this.http.put(this.configUrl + '/' + id, wordbank);
  }

  deleteOne(wordBankId: string) {
    return this.http.delete(this.configUrl + '/' + wordBankId);
  }

  addOne(wordBank: WordBank) {
    return this.http.post<WordBank>(this.configUrl, wordBank);
  }
  constructor(
    private http: HttpClient
  ) { }
}
