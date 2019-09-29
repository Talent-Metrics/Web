import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SurveySubject} from '../../models/survey-subject';
import {SurveySubjectService} from '../../services/survey-subject.service';
import {take} from 'rxjs/operators';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {WordBankService} from '../../../word-bank/services/word-bank.service';
import {WordBank} from '../../../word-bank/models/word-bank';
import {MatDialog} from '@angular/material';
import {SurveyOutputComponent} from '../../components/survey-output/survey-output.component';

@Component({
  selector: 'survey-external',
  templateUrl: './survey-external.component.html',
  styleUrls: ['./survey-external.component.scss']
})
export class SurveyExternalComponent implements OnInit {
  id: string;
  surveySubject: SurveySubject;
  surveySubjectForm: FormGroup;
  wordBank: WordBank;
  step: number = 1;
  completed: boolean;
  getSurveySubjectById() {
    this.surveySubjectService.getSurveySubjectById(this.id)
      .pipe(
        take(1)
      ).subscribe((result: SurveySubject) => {
        if (result.surveyInfo.completed) {
          this.step = 4;
          this.completed = true;
        }
        this.surveySubject = result;
        this.surveySubjectForm = this.surveySubjectService.surveySubjectForm(result);
        this.getWordBank(result.surveyInfo.wordBankId);
    }, err => console.log(err), () => console.log('finished'));
  }
  getWordBank(wordBankId: string) {
    this.wordBankService.getOne(wordBankId)
      .pipe(
        take(1)
      ).subscribe((wb: WordBank) => {
        this.wordBank = wb;
    }, err => console.log(err), () => console.log('got word bank'));
  }
  get personalInfo() {
    if (this.surveySubjectForm.get('personalInfo')) {
      return this.surveySubjectForm.get('personalInfo') as FormGroup;
    }
  }
  get categories() {
    if (this.surveySubjectForm.get('categories')) {
      return this.surveySubjectForm.get('categories') as FormGroup;
    }
  }
  setStep(which: number) {
    if (this.step === 4) {
      return;
    }
    this.step = which;
  }
  setPersonal(evt) {
    if (evt.dirty) {
      this.surveySubjectForm.patchValue({
        personalInfo: evt.values
      });
    }
    this.step++;
  }
  setCategories(evt) {
    this.surveySubjectForm.patchValue(evt);
    this.step++;
  }
  checkFormForFinal() {
    if (this.surveySubjectForm.valid) {
      this.surveySubjectForm.patchValue({
        surveyInfo: {
          completed: true,
          completionDate: new Date()
        }
      });
    }
  }
  updateSurveySubject() {
    this.checkFormForFinal();
    this.surveySubjectService.updateSurveySubjects(this.surveySubject._id, this.surveySubjectForm.value)
      .subscribe(result => {
        console.log(result);
      }, err => console.log(err), () => console.log('update complete'));
  }
  constructor(
    private route: ActivatedRoute,
    private surveySubjectService: SurveySubjectService,
    private wordBankService: WordBankService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSurveySubjectById();
  }

}
