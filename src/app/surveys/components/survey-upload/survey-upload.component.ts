import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import * as XLSX from 'xlsx';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { SurveySubjectService } from '../../services/survey-subject.service';
import { SurveySubject } from '../../models/survey-subject';
import * as moment from 'moment';

@Component({
  selector: 'app-survey-upload',
  templateUrl: './survey-upload.component.html',
  styleUrls: ['./survey-upload.component.scss']
})
export class SurveyUploadComponent implements OnInit, OnDestroy {
  title = 'read-excel-in-angular8';
  storeData: any;
  fileUploaded: File;
  worksheet: XLSX.WorkSheet;
  rowsFound = 0;
  rowsInserted = 0;
  rowsFailed = 0;
  uploadedFile: boolean;
  processedFile: boolean;
  surveySubjects: SurveySubject[] = [];

  educationLevels = [
    { key: 1, value: 'No Formal Education' },
    { key: 2, value: 'Less than High School' },
    { key: 3, value: 'High school' },
    { key: 4, value: 'Some College' },
    { key: 5, value: 'Bachelor\'s Degree' },
    { key: 6, value: 'Graduate or Professional Degree' },
    { key: 7, value: 'Trade School' }
  ];

  constructor(
    public dialogRef: MatDialogRef<SurveyUploadComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public surveySubjectService: SurveySubjectService
) { }

  ngOnInit() {
    this.processedFile = false;
  }

  uploadFile(event) {
    this.fileUploaded = event.target.files[0];
    this.readExcel();
    this.uploadedFile = true;
  }

  readExcel() {
    const readFile = new FileReader();
    readFile.onload = (e) => {
      this.storeData = readFile.result;
      const data = new Uint8Array(this.storeData);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[first_sheet_name];
    };
    readFile.readAsArrayBuffer(this.fileUploaded);
  }

  processFile() {
    this.processedFile = false;
    const range = XLSX.utils.decode_range(this.worksheet['!ref']);
    const ncols = range.e.c - range.s.c + 1;
    const nrows = range.e.r - range.s.r + 1;
    // skip  heading
    if (nrows > 1) {
      this.processedFile = true;
      this.rowsFound = nrows;

      for (let R = 1; R <= range.e.r; ++R) {
        let obj = { categories: {}, personalInfo: {}, surveyInfo: {}} as SurveySubject;
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cell_address = {c: C, r: R};
          const header_cell_address = {c: C, r: 0};
          /* if an A1-style address is needed, encode the address */
          const cell_ref = XLSX.utils.encode_cell(cell_address);
          const header_cell_ref = XLSX.utils.encode_cell(header_cell_address);

          // Find desired cell
          const desired_cell = this.worksheet[cell_ref];
          const header_cell = this.worksheet[header_cell_ref];

          // Get the value
          const desired_value = (desired_cell ? desired_cell.v : undefined);
          const header_value = (header_cell ? header_cell.v : undefined);

          obj = this.mapSurveyParticipant(obj, desired_value, header_value);
        }

        obj.surveyInfo.customerId = this.data.surveyInfo.customerId;
        obj.surveyInfo.completed = false;
        obj.surveyInfo.createDate = this.data.surveyInfo.createDate;
        obj.surveyInfo.organizationId = this.data.surveyInfo.organizationId;
        obj.surveyInfo.wordBankId = this.data.surveyInfo.wordBankId;
        obj.surveyInfo.surveyId = this.data.surveyInfo.surveyId;

        this.surveySubjectService.addSurveySubject(obj)
        .subscribe((e: SurveySubject) => {
          this.rowsInserted++;
          this.surveySubjects.push(e);
        },
        err => {console.log(err); this.rowsFailed++; },
        () => console.log('survey subject add'));
    }
  }
}

  mapSurveyParticipant(obj: SurveySubject, value: any, header: string ): SurveySubject {
    switch (header) {
      case 'firstName':
      case 'lastName':
      case 'email':
      case 'positionTitle':
      case 'department':
      case 'division':
      case 'location':
      case 'ethnicity':
      case 'gender':
      case 'manager':
      case 'employeeClass':
        obj.personalInfo[header] = value;
        break;
      case 'veteranStatus':
          obj.personalInfo.veteranStatus = (value === 'Veteran' ? true : false);
        break;
      case 'disabilityStatus':
            obj.personalInfo.disabilityStatus = (value === 'Disabled' ? true : false);
        break;
      case 'hireDate':
      case 'dob':
          obj.personalInfo[header] = moment(value, 'MM/DD/YYYY').toDate();
          break;
      case 'educationLevel':
          obj.personalInfo.educationLevel = this.educationLevels.find(j => j.value === value ).key;
      break;
      default:
        console.log('Sorry, we don\'t support field ' + header + '.');
    }

    return obj;
  }

  finishSurveyUpload() {
    this.dialogRef.close({success: this.rowsInserted, failed: this.rowsFailed, subjects: this.surveySubjects});
  }

  ngOnDestroy(): void {
    this.fileUploaded = null;
    this.uploadedFile = false;
  }


}
