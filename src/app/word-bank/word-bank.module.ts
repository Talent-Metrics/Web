import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WordBankComponent } from './containers/word-bank/word-bank.component';
import { MaterialModule } from '../material/material.module';
import { WordComponent } from './components/word/word.component';
import { WordDialogComponent } from './components/word-dialog/word-dialog.component';
import { WordBankDialogComponent } from './components/word-bank-dialog/word-bank-dialog.component';

@NgModule({
  declarations: [WordBankComponent, WordComponent, WordDialogComponent, WordBankDialogComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [WordBankComponent],
  entryComponents: [WordDialogComponent, WordBankDialogComponent]
})
export class WordBankModule { }
