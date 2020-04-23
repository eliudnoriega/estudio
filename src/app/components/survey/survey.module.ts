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


@NgModule({
  declarations: [SurveyEditComponent, SurveyComponent, AddSurveyComponent],
  exports: [
    SurveyEditComponent,
    SurveyComponent,AddSurveyComponent
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
    RecaptchaModule
  ],
  entryComponents:[
    LayoutDialogComponent
  ]
})
export class SurveyModule { }
