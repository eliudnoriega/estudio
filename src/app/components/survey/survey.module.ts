import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SurveyEditComponent} from './survey-edit/survey-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import { SurveyComponent } from './survey.component';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import {MatDialogModule} from '@angular/material/dialog';
import {LayoutDialogComponent} from '../layout/layout-dialog/layout-dialog.component';
import {LayoutsModule} from '../layout/layouts.module';
import {RecaptchaModule} from 'ng-recaptcha';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import {ProductsListComponent} from '../products/products-list/products-list.component';
import {AgGridModule} from '@ag-grid-community/angular';
import { DialogAddQuestionComponent } from './add-questions/dialog-add-question/dialog-add-question.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DialogIconComponent } from './add-questions/dialog-icon/dialog-icon.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { SurveyResponseComponent } from './survey-response/survey-response.component';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [SurveyEditComponent, SurveyComponent, AddSurveyComponent, AddQuestionsComponent, ProductsListComponent, DialogAddQuestionComponent, DialogIconComponent, SurveyResponseComponent],
  exports: [
    SurveyEditComponent,
    SurveyComponent,AddSurveyComponent, ProductsListComponent, DialogAddQuestionComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    FlexModule,
    MatButtonModule,
    MatDialogModule,
    LayoutsModule,
    LayoutsModule,
    RecaptchaModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatIconModule,
    AgGridModule.withComponents([]),
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatRadioModule,
  ],
  entryComponents:[
    LayoutDialogComponent
  ]
})
export class SurveyModule { }
